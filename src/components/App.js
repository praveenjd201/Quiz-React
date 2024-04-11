import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartQuiz from "./StartQuiz";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  //status : loading||error||ready||active||finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_EACH_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_EACH_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      // console.log("state", state.answer);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unKnown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numsQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  // console.log(numsQuestions);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://praveenjd201.github.io/Fake_API/questions.json"
        );
        const data = await res.json();
        console.log(data.questions);
        dispatch({ type: "dataReceived", payload: data.questions });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartQuiz numsQuestions={numsQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              maxPoints={maxPoints}
              numsQuestions={numsQuestions}
              answer={answer}
              points={points}
              index={index}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numsQuestions={numsQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            highscore={highscore}
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
