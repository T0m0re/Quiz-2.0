import { useQuestions } from "../Context/questionsContext";
import Subject from "./Subject";
import styles from "./Subjects.module.css";

function Subjects() {
  const { availableTopics } = useQuestions();

  return (
    <div className={styles.subjects}>
      {availableTopics.map((question) => (
        <Subject question={question} key={question} />
      ))}
    </div>
  );
}

export default Subjects;
