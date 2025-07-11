import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useAuthRedirect = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const handleProtectedAction = () => {
    if (authUser) {
      navigate("/surveyBuilder");
    } else {
      navigate("/login");
    }
  };

  return handleProtectedAction;
};

export default useAuthRedirect;
