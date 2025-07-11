import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const SurveyFill = () => {
  const [surveyData, setSurveyData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`/api/survey/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Nie znaleziono ankiety.");
        }

        setSurveyData(data);
        setQuestions(data.questions || []);
      } catch (err) {
        toast.error(err.message);
        navigate("/surveylist");
      }
    };

    fetchSurvey();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId, option) => {
    const current = answers[questionId] || [];
    const newAnswers = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswers((prev) => ({ ...prev, [questionId]: newAnswers }));
  };

  const handleSubmit = async () => {
    const missing = questions.filter((q) => answers[q._id] == null);
    if (missing.length > 0) {
      toast.error("Odpowiedz na wszystkie pytania.");
      return;
    }

    try {
      const res = await fetch(`/api/responses/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, answer]) => ({
            questionId,
            answer,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Błąd podczas zapisywania odpowiedzi.");
      }

      toast.success("Dziękujemy za wypełnienie ankiety!");
      navigate("/surveylist");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!surveyData) return <div className="p-10">Ładowanie...</div>;

  return (
    <div className="min-h-screen p-10 bg-slate-100 text-slate-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">{surveyData.title}</h1>
        <p className="mb-4 text-slate-600">{surveyData.description}</p>

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q._id} className="border-b pb-4">
              <div className="font-medium mb-1">
                {idx + 1}. {q.questionText}
              </div>

              {q.type === "text" && (
                <input
                  type="text"
                  className="border rounded  px-3 py-2 w-full bg-slate-100 text-slate-900"
                  value={answers[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                />
              )}

              {q.type === "single_choice" && (
                <div className="space-y-1">
                  {q.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        checked={answers[q._id] === opt}
                        onChange={() => handleAnswerChange(q._id, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {q.type === "multiple_choice" && (
                <div className="space-y-1">
                  {q.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={answers[q._id]?.includes(opt) || false}
                        onChange={() => handleCheckboxChange(q._id, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {q.type === "scale" && (
                <input
                  type="range"
                  min={1}
                  max={q.scaleMax}
                  value={answers[q._id] || Math.floor(q.scaleMax / 2)}
                  onChange={(e) =>
                    handleAnswerChange(q._id, parseInt(e.target.value))
                  }
                  className="w-full"
                />
              )}

              {q.type === "rating" && (
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`text-2xl ${
                        answers[q._id] === i
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleAnswerChange(q._id, i)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="mt-6 bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-xl"
          onClick={handleSubmit}
        >
          Wyślij ankietę
        </button>
      </div>
    </div>
  );
};

export default SurveyFill;
