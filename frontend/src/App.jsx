import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import SurveyBuilder from "./pages/surveyBuilder/SurveyBuilder";
import SurveyList from "./pages/surveyList/SurveyList";
import SurveyPanel from "./pages/surveyPanel/SurveyPanel";
import SurveyFill from "./pages/surveyFill/SurveyFill";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/surveyList" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/login" /> : <SignUp />}
        />
        <Route
          path="/surveybuilder"
          element={authUser ? <SurveyBuilder /> : <Navigate to="/login" />}
        />
        <Route
          path="/surveylist"
          element={authUser ? <SurveyList /> : <Navigate to="/login" />}
        />
        <Route path="/survey/:id" element={<SurveyFill />} />
        <Route
          path="/surveypanel"
          element={authUser ? <SurveyPanel /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
