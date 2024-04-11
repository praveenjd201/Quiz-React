function StartQuiz({ numsQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>welcome to The React Quiz!</h2>
      <h4>{numsQuestions} questions to test your react mastery!</h4>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let Start
      </button>
    </div>
  );
}

export default StartQuiz;
