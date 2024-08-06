import { useQuestions } from "../Context/questionsContext";

function Points() {
  const { pointObject, currentTopic } = useQuestions();
  return <div>{pointObject[currentTopic]}</div>;
}

export default Points;
