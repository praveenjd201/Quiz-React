function Progress({ maxPoints, numsQuestions, answer, points, index }) {
  return (
    <header className="progress">
      <progress max={numsQuestions} value={index + Number(answer !== null)} />
      <p>
        question <strong>{index + 1}</strong> / {numsQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
