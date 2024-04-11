import { useEffect } from "react";
function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  let minutes = Math.floor(secondsRemaining / 60);
  let seconds = secondsRemaining % 60;
  return (
    <div className="timer">
      {/* {minutes < 10 ? `0${minutes}` : `${minutes}`}:
      {seconds < 10 ? `0${seconds}` : `${seconds}`}  */}
      {/* alternative way */}
      <span>
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}
      </span>
    </div>
  );
}

export default Timer;
