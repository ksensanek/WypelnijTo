import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useCreateSurvey = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const createSurvey = async (
    title,
    description,
    endDate,
    questions,
    status
  ) => {
    const success = handleInputErrors(title, description, endDate, questions);
    if (!success) return null;
    setLoading(true);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          endDate,
          questions,
          status,
        }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("survey-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Ankieta została utworzona");
      return data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createSurvey };
};

export default useCreateSurvey;

function handleInputErrors(title, description, endDate, questions) {
  if (!title || !description || !endDate || !questions) {
    toast.error("Proszę uzupełnić wszystkie pola");
    return false;
  }
  if (questions.length === 0) {
    toast.error("Proszę dodać przynajmniej jedno pytanie");
    return false;
  }

  if (new Date(endDate) < new Date()) {
    toast.error("Data zakończenia musi być w przyszłości");
    return false;
  }

  return true;
}
