import "./App.css";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Main from "./components/Main";
import QuestionBox from "./components/QuestionBox";
import Questions from "./components/Questions";
import { useQuestions } from "./Context/questionsContext";

function App() {
  const { status } = useQuestions();

  return (
    <Main>
      {status === "loading" && <LandingPage />}
      {status === "ready" && (
        <QuestionBox>
          <Header />
          <Questions />
        </QuestionBox>
      )}
    </Main>
  );
}

export default App;
