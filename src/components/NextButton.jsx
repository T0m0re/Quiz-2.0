import styles from "./Option.module.css";

import { useQuestions } from "../Context/questionsContext";

function NextButton() {
  const { index, questionData, dispatch, answer } = useQuestions();
  const numQuestions = questionData.length;
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className={`${styles.btn} ${styles.btn}'-ui'`}
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className={`${styles.btn} ${styles.btn}'-ui'`}
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
