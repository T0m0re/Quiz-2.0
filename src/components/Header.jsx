import styles from "./Header.module.css";
import { useQuestions } from "../Context/questionsContext";
import css from "../assets/css-svg.svg";
import html from "../assets/html-svg.svg";
import javascript from "../assets/javascriptt-svg.svg";
import react from "../assets/react-svg.svg";
import Timer from "./Timer";

function Header() {
  const { currentTopic } = useQuestions();

  const eachQuestion = currentTopic.split(`-`)[0];

  let image =
    eachQuestion == "css"
      ? css
      : eachQuestion == "html"
      ? html
      : eachQuestion == "javascript"
      ? javascript
      : react;
  return (
    <div className={styles.header}>
      <div>
        <img
          className={styles.subjectImg}
          src={image}
          alt={`${eachQuestion}_image`}
        />
      </div>
      <Timer />
    </div>
  );
}

export default Header;
