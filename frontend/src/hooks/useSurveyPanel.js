import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSurveyPanel = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const surveyPanel = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/survey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Wystąpił błąd podczas pobierania ankiet"
        );
      }

      return data;
    } catch (err) {
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, surveyPanel };
};

export default useSurveyPanel;
