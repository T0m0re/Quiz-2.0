/* eslint-disable react/prop-types */
import { useQuestions } from "../Context/questionsContext";
import NextButton from "./NextButton";
import Option from "./Option";

function Questions() {
  const { questionData, index } = useQuestions();

  const question = questionData[index];

  return (
    <div className="question_box">
      <h4>{question.question}</h4>
      <Option question={question} />
      <NextButton />
    </div>
  );
}

export default Questions;
