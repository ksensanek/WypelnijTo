import { useState } from "react";
import { toast } from "react-hot-toast";

const useCreateQuestion = () => {
  const [loading, setLoading] = useState(false);

  const createQuestion = async (
    surveyId,
    type,
    questionText,
    options = [],
    scaleMax = null
  ) => {
    const success = handleInputErrors({
      surveyId,
      type,
      questionText,
      options,
      scaleMax,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyId,
          type,
          questionText,
          options,
          scaleMax,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Pytanie zostało utworzone");
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, createQuestion };
};

export default useCreateQuestion;

function handleInputErrors({
  surveyId,
  type,
  questionText,
  options,
  scaleMax,
}) {
  if (!surveyId || !type || !questionText) {
    toast.error("Proszę uzupełnić wszystkie wymagane pola");
    return false;
  }

  const allowedTypes = [
    "single_choice",
    "multiple_choice",
    "scale",
    "text",
    "rating",
  ];
  if (!allowedTypes.includes(type)) {
    toast.error("Nieprawidłowy typ pytania");
    return false;
  }

  if (
    (type === "single_choice" || type === "multiple_choice") &&
    (!Array.isArray(options) || options.length === 0)
  ) {
    toast.error("Dla pytań wyboru proszę dodać przynajmniej jedną opcję");
    return false;
  }
  if (type === "scale" && (typeof scaleMax !== "number" || scaleMax <= 1)) {
    toast.error("Maksymalna skala musi być liczbą większą niż 1");
    return false;
  }
}
