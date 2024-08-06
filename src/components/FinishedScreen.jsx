import { useQuestions } from "../Context/questionsContext";

function FinishedScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuestions();

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {/* {Math.ceil(percentage)}%) */}
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
