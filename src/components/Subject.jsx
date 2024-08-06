/* eslint-disable react/prop-types */

import styles from "./Subject.module.css";
import css from "../assets/css-svg.svg";
import html from "../assets/html-svg.svg";
import javascript from "../assets/javascriptt-svg.svg";
import react from "../assets/react-svg.svg";
import { useQuestions } from "../Context/questionsContext";

function Subject({ question }) {
  const { getQuestions, dispatch } = useQuestions();

  const eachQuestion = question.split(`-`)[0];

  let image =
    eachQuestion == "css"
      ? css
      : eachQuestion == "html"
      ? html
      : eachQuestion == "javascript"
      ? javascript
      : react;

  function onClick() {
    getQuestions(question);
    dispatch({ type: "SelectedTopic", payload: question });
  }
  return (
    <div className={styles.box} onClick={onClick}>
      <h3 className={styles.subjectText}>{eachQuestion}</h3>
      <img
        className={styles.subjectImg}
        src={image}
        alt={`${eachQuestion} image`}
      />
    </div>
  );
}

export default Subject;
