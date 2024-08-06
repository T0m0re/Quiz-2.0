/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const questionsContext = createContext();
const BASE_URL = "http://localhost:8000/questions";
const SEC_PER_QUESTION = 15;
const initialState = {
  availableTopics: [],
  questions: [],
  questionData: [],
  currentTopic: "",

  // 'loading', "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  maxPoint: 100,
  points: 0,
  pointObject: {},
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "Questions/loaded":
      return {
        ...state,
        availableTopics: action.payload,
        questions: action.payload_two,
      };

    case "getQuestionData":
      return {
        ...state,
        status: "ready",
        questionData: action.payload,
      };

    case "SelectedTopic": {
      const newPointObject = {};
      state.availableTopics.forEach((value) => {
        newPointObject[value] = null;
      });
      return {
        ...state,
        currentTopic: action.payload,
        secondsRemaining: SEC_PER_QUESTION,
        pointObject: newPointObject,
      };
    }

    case "newAnswer": {
      const updated = {
        ...state.pointObject,
        [state.currentTopic]:
          action.payload === state.questionData.at(state.index).correctOption
            ? state.pointObject[state.currentTopic] +
              state.maxPoint * state.secondsRemaining
            : state.pointObject[state.currentTopic],
      };

      return {
        ...state,
        answer: action.payload,
        secondsRemaining: null,
        points:
          action.payload === state.questionData.at(state.index).correctOption
            ? state.points + state.maxPoint * state.secondsRemaining
            : state.points,
        pointObject: updated,
      };
    }

    case "nextQuestion":
      console.log(state.pointObject);
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        secondsRemaining: SEC_PER_QUESTION,
      };

    case "finish":
      return { ...state, status: "finished" };

    case "timer":
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };

    case "rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function QuestionsProvider({ children }) {
  const [
    {
      questions,
      availableTopics,
      status,
      index,
      questionData,
      answer,
      currentTopic,
      secondsRemaining,
      points,
      pointObject,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        console.log(data);
        const questions = [];
        Object.keys(data).forEach((key) => {
          questions.push(key);
        });
        dispatch({
          type: "Questions/loaded",
          payload: questions,
          payload_two: data,
        });
        console.log(questions);
      } catch {
        dispatch({ type: "rejected", payload: "Failed To Load Data" });
        alert("abeggggi");
      }
    }
    fetchQuestions();
  }, []);

  function getQuestions(questionSetName) {
    const questionSet = questions[questionSetName];
    if (questionSet) {
      console.log(questionSet);
      dispatch({ type: "getQuestionData", payload: questionSet });
    } else {
      throw new Error(`Question set "${questionSetName}" not found`);
    }
  }

  return (
    <questionsContext.Provider
      value={{
        availableTopics,
        getQuestions,
        currentTopic,
        dispatch,
        status,
        index,
        questionData,
        answer,
        secondsRemaining,
        points,
        pointObject,
      }}
    >
      {children}
    </questionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(questionsContext);
  if (context === undefined)
    throw new Error("QuestionContext was used outside the QuestionProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { QuestionsProvider, useQuestions };
