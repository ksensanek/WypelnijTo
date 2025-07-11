import { useEffect, useState } from "react";
import useLogout from "../../hooks/useLogout";
import useSurveyPanel from "../../hooks/useSurveyPanel";

const SurveyPanel = () => {
  const { loading: logoutLoading, logout } = useLogout();
  const { loading: surveysLoading, surveyPanel } = useSurveyPanel();
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const rawSurveys = await surveyPanel();
      if (rawSurveys) {
        const mapped = rawSurveys.map((s) => ({
          id: s._id,
          name: s.title,
          responses: 0,
          startDate: s.createdAt,
          endDate: s.endDate,
          isPublished: s.status === "active",
        }));
        setSurveys(mapped);
      }
    };
    fetchSurveys();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-slate-100 to-slate-200 text-slate-800">
      <aside className="w-64 bg-white/30 backdrop-blur-md border-r border-slate-300 px-6 py-8 shadow-lg">
        <div className="text-3xl font-extrabold text-slate-900 mb-10">
          <span className="text-slate-400">Wypełnij</span>
          <span className="text-slate-900">To!</span>
        </div>
        <div className="text-base text-slate-700 font-medium">
          📋 Lista utworzonych ankiet
        </div>
      </aside>
      <main className="flex-1 p-10 space-y-10">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="🔍 Wyszukiwarka"
            className="w-1/2 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-md border border-slate-300 text-slate-800 shadow-sm"
          />

          <button
            onClick={logout}
            disabled={logoutLoading}
            className="text-lg font-medium text-slate-700 hover:text-slate-900 transition"
          >
            {logoutLoading ? (
              <span className="loading loading-spinner text-slate-700"></span>
            ) : (
              "Wyloguj się"
            )}
          </button>
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-slate-300 rounded-2xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Twoje ankiety</h2>
            <button
              className="bg-slate-900 text-white py-2 px-6 rounded-lg hover:bg-slate-800 transition text-lg shadow-sm"
              onClick={() => (window.location.href = "/surveybuilder")}
            >
              + Nowa ankieta
            </button>
          </div>

          {surveysLoading ? (
            <div className="text-center text-slate-600 text-lg">
              🔄 Ładowanie ankiet...
            </div>
          ) : surveys.length === 0 ? (
            <div className="text-center text-slate-500 text-lg">
              Brak ankiet do wyświetlenia.
            </div>
          ) : (
            <table className="w-full table-auto text-left text-base">
              <thead>
                <tr className="text-slate-700 border-b border-slate-300">
                  <th className="py-3 px-4">Nazwa</th>
                  <th className="py-3 px-4">Wypełnienia</th>
                  <th className="py-3 px-4">Start</th>
                  <th className="py-3 px-4">Koniec</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Akcja</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((survey) => (
                  <tr key={survey.id} className="hover:bg-white/40 transition">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-900">
                        {survey.name || "Brak tytułu"}
                      </div>
                      <div className="text-sm text-slate-500">
                        id:{survey.id}
                      </div>
                    </td>
                    <td className="py-4 px-4">{survey.responses}</td>
                    <td className="py-4 px-4">
                      {new Date(survey.startDate).toLocaleDateString("pl-PL")}
                    </td>
                    <td className="py-4 px-4">
                      {new Date(survey.endDate).toLocaleDateString("pl-PL")}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {survey.isPublished ? "Opublikowane" : "Nieopublikowane"}
                    </td>
                    <td className="py-4 px-4">
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm shadow-sm">
                        Usuń
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default SurveyPanel;
