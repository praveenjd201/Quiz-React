function Option({ questions, dispatch, answer }) {
  const hasAnswer = answer != null;
  // console.log(hasAnswer);
  return (
    <div className="options">
      {questions.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option 
            ${index === answer ? "answer" : ""} ${
              hasAnswer
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            key={option}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: index });
            }}
            disabled={hasAnswer}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Option;
