import { useEffect } from "react";
import { useQuestions } from "../Context/questionsContext";

function Timer() {
  const { secondsRemaining, dispatch, pointObject, currentTopic } =
    useQuestions();
  useEffect(
    function () {
      if (secondsRemaining === null) return;
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      if (secondsRemaining === 0) dispatch({ type: "nextQuestion" });

      return () => clearInterval(id);
    },
    [dispatch, secondsRemaining]
  );

  return (
    <div>
      {secondsRemaining} {pointObject[currentTopic]}
    </div>
  );
}

export default Timer;
