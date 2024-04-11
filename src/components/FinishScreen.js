function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percent = (points / maxPoints) * 100;
  let emoji;
  if (percent === 100) emoji = "💰";
  if (percent >= 80 && percent < 100) emoji = "🎉";
  if (percent >= 50 && percent < 80) emoji = "'🙃";
  if (percent >= 0 && percent < 50) emoji = "😏";
  if (percent === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji}You scored {points} points out of {maxPoints} (
        {Math.ceil(percent)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
