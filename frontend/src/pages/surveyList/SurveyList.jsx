import useLogout from "../../hooks/useLogout";
import useSurveyList from "../../hooks/useSurveyList";
import { useNavigate } from "react-router-dom";

const SurveyList = () => {
  const { loading: logoutLoading, logout } = useLogout();
  const { loading: surveysLoading, surveys } = useSurveyList();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-slate-800 p-10">
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="🔍 Wyszukiwarka"
          className="w-1/2 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-md border border-slate-300 text-slate-800 placeholder-slate-500 shadow-sm focus:outline-none"
        />
        <div className="flex items-center gap-4">
          <button
            className="text-base font-medium text-slate-700 hover:text-slate-900 transition"
            onClick={() => (window.location.href = "/surveypanel")}
          >
            Moje ankiety
          </button>
          <button
            className="text-base font-medium text-slate-700 hover:text-slate-900 transition"
            onClick={() => (window.location.href = "/surveybuilder")}
          >
            Stwórz ankietę
          </button>
          <button
            onClick={logout}
            disabled={logoutLoading}
            className="text-base font-medium text-slate-700 hover:text-slate-900 transition"
          >
            {logoutLoading ? (
              <span className="loading loading-spinner text-slate-700"></span>
            ) : (
              "Wyloguj się"
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Aktualne Ankiety
        </h1>
        <button className="bg-white text-slate-800 border border-slate-300 px-4 py-2 rounded-md hover:bg-slate-100 transition shadow-sm">
          Filtry ▼
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md">
        <div className="grid grid-cols-4 gap-4 text-slate-700 text-sm font-semibold border-b border-slate-300 pb-2 mb-4">
          <div>Nazwa</div>
          <div>Opis</div>
          <div>Status</div>
          <div></div>
        </div>

        {surveysLoading ? (
          <div className="text-center text-slate-600 py-6">
            🔄 Ładowanie ankiet...
          </div>
        ) : surveys.length === 0 ? (
          <div className="text-center text-slate-500 py-6">
            Brak dostępnych ankiet.
          </div>
        ) : (
          surveys.map((survey) => (
            <div
              key={survey.id}
              className="grid grid-cols-4 gap-4 items-center text-slate-900 py-3 rounded-lg hover:bg-white/40 transition"
            >
              <div className="font-medium">{survey.name}</div>
              <div>{survey.description}</div>
              <div
                className={`text-sm ${
                  survey.isAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {survey.isAvailable ? "Dostępna" : "Niedostępna"}
              </div>
              <div className="text-right">
                {survey.isAvailable && (
                  <button
                    onClick={() => navigate(`/survey/${survey.id}`)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
                  >
                    Wypełnij ▶
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SurveyList;
