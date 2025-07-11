import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useCreateSurvey from "../../hooks/useCreateSurvey";
import useCreateQuestion from "../../hooks/useCreateQuestion";
import { useNavigate } from "react-router-dom";

const SurveyBuilder = () => {
  const [showModal, setShowModal] = useState(false);
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    endDate: "",
  });

  const [questionTypeModalOpen, setQuestionTypeModalOpen] = useState(false);
  const [questionFormModalOpen, setQuestionFormModalOpen] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const [scaleMax, setScaleMax] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const { createSurvey, loading } = useCreateSurvey();
  const { createQuestion } = useCreateQuestion();

  const navigate = useNavigate();

  useEffect(() => {
    const storedSurvey = localStorage.getItem("surveyData");
    const storedQuestions = localStorage.getItem("surveyQuestions");

    if (storedSurvey) {
      setSurveyData(JSON.parse(storedSurvey));
    } else {
      setShowModal(true);
    }

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const handleSurveyChange = (e) => {
    setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
  };

  const saveSurveyData = () => {
    const { title, description, endDate } = surveyData;
    if (!title || !description || !endDate) {
      toast.error("Uzupełnij wszystkie pola ankiety");
      return;
    }

    localStorage.setItem("surveyData", JSON.stringify(surveyData));
    toast.success("Dane ankiety zapisane!");
    setShowModal(false);
  };

  const resetQuestionForm = () => {
    setQuestionFormModalOpen(false);
    setSelectedQuestionType(null);
    setQuestionText("");
    setOptions([""]);
    setScaleMax(10);
    setEditingIndex(null);
  };

  const handleSaveQuestion = () => {
    if (!questionText || !selectedQuestionType) {
      toast.error("Uzupełnij treść pytania i wybierz typ");
      return;
    }

    const newQuestion = {
      id:
        editingIndex !== null
          ? questions[editingIndex].id
          : crypto.randomUUID(),
      type: selectedQuestionType,
      questionText,
      options: selectedQuestionType.includes("choice") ? options : [],
      scaleMax: selectedQuestionType === "scale" ? scaleMax : null,
    };

    const updatedQuestions = [...questions];
    if (editingIndex !== null) {
      updatedQuestions[editingIndex] = newQuestion;
      toast.success("Pytanie zaktualizowane!");
    } else {
      updatedQuestions.push(newQuestion);
      toast.success("Pytanie dodane!");
    }

    setQuestions(updatedQuestions);
    localStorage.setItem("surveyQuestions", JSON.stringify(updatedQuestions));
    resetQuestionForm();
  };

  const handleEditQuestion = (index) => {
    const q = questions[index];
    setSelectedQuestionType(q.type);
    setQuestionText(q.questionText);
    setOptions(q.options.length ? q.options : [""]);
    setScaleMax(q.scaleMax || 10);
    setEditingIndex(index);
    setQuestionFormModalOpen(true);
  };

  const handleDeleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    localStorage.setItem("surveyQuestions", JSON.stringify(updated));
    toast.success("Pytanie usunięte!");
  };

  const handleCreateSurvey = async () => {
    console.log("Tworzenie ankiety...");

    const { title, description, endDate } = surveyData;
    if (!title || !description || !endDate || questions.length === 0) {
      toast.error(
        "Uzupełnij wszystkie pola i dodaj przynajmniej jedno pytanie"
      );
      return;
    }

    const result = await createSurvey(
      title,
      description,
      endDate,
      questions,
      "active"
    );

    if (result) {
      console.log("Ankieta utworzona, czyszczenie localStorage...");

      localStorage.removeItem("surveyData");
      localStorage.removeItem("surveyQuestions");

      setSurveyData({ title: "", description: "", endDate: "" });
      setQuestions([]);
      setShowModal(true);

      toast.success("Ankieta została utworzona!");

      setTimeout(() => {
        navigate("/surveypanel");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-slate-100 to-slate-200 text-slate-800 relative">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold text-slate-800">
              Informacje o ankiecie
            </h2>
            <input
              name="title"
              value={surveyData.title}
              onChange={handleSurveyChange}
              placeholder="Tytuł ankiety"
              className="w-full border px-3 py-2 rounded-md bg-slate-100"
            />
            <input
              name="description"
              value={surveyData.description}
              onChange={handleSurveyChange}
              placeholder="Opis ankiety"
              className="w-full border px-3 py-2 rounded-md bg-slate-100"
            />
            <input
              name="endDate"
              type="datetime-local"
              value={surveyData.endDate}
              onChange={handleSurveyChange}
              className="w-full border px-3 py-2 rounded-md bg-slate-100"
            />
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 bg-slate-200 text-slate-800 rounded-xl hover:bg-slate-300"
              >
                Anuluj
              </button>
              <button
                onClick={saveSurveyData}
                className="w-full py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800"
              >
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}

      {questionFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md space-y-4">
            <h2 className="text-lg font-bold">
              {editingIndex !== null ? "Edytuj pytanie" : "Dodaj pytanie"}
            </h2>
            <div className="font-semibold">
              Rodzaj pytania:{" "}
              {{
                single_choice: "Jednokrotny wybór",
                multiple_choice: "Wielokrotny wybór",
                scale: "Skala",
                text: "Odpowiedź tekstowa",
                rating: "Ocena 0–5",
              }[selectedQuestionType] || ""}
            </div>
            <input
              type="text"
              placeholder="Treść pytania"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full border px-3 py-2 rounded bg-slate-100"
            />

            {(selectedQuestionType === "single_choice" ||
              selectedQuestionType === "multiple_choice") && (
              <div className="space-y-2">
                {options.map((opt, idx) => (
                  <input
                    key={idx}
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[idx] = e.target.value;
                      setOptions(newOptions);
                    }}
                    placeholder={`Opcja ${idx + 1}`}
                    className="w-full border px-3 py-2 rounded bg-slate-100"
                  />
                ))}
                <button
                  onClick={() => setOptions([...options, ""])}
                  className="text-sm text-slate-500"
                >
                  ➕ Dodaj opcję
                </button>
              </div>
            )}

            {selectedQuestionType === "scale" && (
              <input
                type="number"
                min={2}
                value={scaleMax}
                onChange={(e) => setScaleMax(Number(e.target.value))}
                placeholder="Maksymalna wartość skali"
                className="w-full border px-3 py-2 rounded bg-slate-100"
              />
            )}

            <div className="flex justify-between gap-2 pt-2">
              <button
                onClick={resetQuestionForm}
                className="px-4 py-2 text-slate-600 border rounded"
              >
                Anuluj
              </button>
              <button
                onClick={handleSaveQuestion}
                className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
              >
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}

      {questionTypeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md space-y-4">
            <h2 className="text-lg font-bold">Wybierz typ pytania</h2>
            {[
              { label: "Jednokrotny wybór", type: "single_choice" },
              { label: "Wielokrotny wybór", type: "multiple_choice" },
              { label: "Skala (suwak)", type: "scale" },
              { label: "Odpowiedź tekstowa", type: "text" },
              { label: "Ocena 0–5", type: "rating" },
            ].map(({ label, type }) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedQuestionType(type);
                  setQuestionTypeModalOpen(false);
                  setQuestionFormModalOpen(true);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setQuestionTypeModalOpen(false)}
              className="text-sm text-red-500"
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      <aside className="w-80 bg-white/30 backdrop-blur-md border-r border-slate-300 px-6 py-8 shadow-lg">
        <div className="text-3xl font-extrabold text-slate-900 mb-10">
          <span className="text-slate-400">Wypełnij</span>
          <span className="text-slate-900">To!</span>
        </div>
        <div className="space-y-4 mb-4">
          <input
            type="text"
            className="text-2xl font-bold text-slate-900 bg-transparent border-b border-slate-400 px-2 w-full"
            value={surveyData.title}
            disabled
          />
          <input
            type="text"
            className="text-base bg-transparent border-b border-slate-300 px-2 w-full"
            value={surveyData.description}
            disabled
          />
          <input
            type="datetime-local"
            className="text-base bg-transparent border-b border-slate-300 px-2 w-full"
            value={surveyData.endDate}
            disabled
          />
          <button
            className="text-sm text-slate-700 hover:text-slate-900"
            onClick={() => setShowModal(true)}
          >
            ✏️ Edytuj
          </button>
        </div>
        <button
          className="w-full py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition"
          onClick={() => setQuestionTypeModalOpen(true)}
        >
          ➕ Dodaj pytanie
        </button>
      </aside>

      <main className="flex-1 p-10 space-y-10 relative flex flex-col">
        <h2 className="text-xl font-bold text-slate-800">Dodane pytania:</h2>
        <ul className="space-y-4">
          {questions.length === 0 ? (
            <p className="text-slate-500">Brak pytań w ankiecie.</p>
          ) : (
            questions.map((q, i) => (
              <li
                key={q.id || i}
                className="border bg-white rounded p-4 shadow-sm text-slate-700"
              >
                <div className="text-sm text-slate-500 mb-1">
                  {{
                    single_choice: "Jednokrotny wybór",
                    multiple_choice: "Wielokrotny wybór",
                    scale: "Skala",
                    text: "Odpowiedź tekstowa",
                    rating: "Ocena 0–5",
                  }[q.type] || q.type}
                </div>
                <div className="font-semibold mb-2">{q.questionText}</div>
                {q.type === "text" && (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Odpowiedź..."
                    disabled
                  />
                )}
                {q.type === "scale" && (
                  <input
                    type="range"
                    min="1"
                    max={q.scaleMax}
                    className="w-full"
                    disabled
                  />
                )}
                {q.type === "rating" && (
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                )}
                {(q.type === "single_choice" ||
                  q.type === "multiple_choice") && (
                  <ul className="space-y-1">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>
                        <label className="flex items-center gap-2">
                          <input
                            type={
                              q.type === "single_choice" ? "radio" : "checkbox"
                            }
                            disabled
                          />{" "}
                          {opt}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEditQuestion(i)}
                    className="text-sm text-blue-600"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(i)}
                    className="text-sm text-red-600"
                  >
                    Usuń
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <button
          disabled={questions.length === 0 || loading}
          onClick={handleCreateSurvey}
          className={`mt-6 px-6 py-2 rounded-xl text-white self-center transition ${
            questions.length > 0 && !loading
              ? "bg-slate-700 hover:bg-slate-800"
              : "bg-slate-700 opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Tworzenie..." : "Utwórz ankietę"}
        </button>
      </main>
    </div>
  );
};

export default SurveyBuilder;
