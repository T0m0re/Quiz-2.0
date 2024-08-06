/* eslint-disable react/prop-types */
import { useQuestions } from "../Context/questionsContext";
import styles from "./Option.module.css";
function Option({ question }) {
  const { dispatch, answer } = useQuestions();
  const hasAnswered = answer !== null;

  return (
    <div className={styles.options}>
      {question.options.map((options, index) => (
        <button
          className={`${styles.btn} ${styles.btnOption} ${
            answer === index ? `${styles.answer}` : ""
          } ${
            hasAnswered
              ? index === question.correctOption
                ? `${styles.correct}`
                : `${styles.wrong}`
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {options}
        </button>
      ))}
    </div>
  );
}

export default Option;
