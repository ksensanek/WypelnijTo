import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md bg-white/40 border border-slate-300">
        <h1 className="text-3xl font-semibold text-center text-slate-800 mb-6">
          <span className="text-slate-700">Zaloguj się do</span>{" "}
          <span className="text-slate-900 font-extrabold">WypełnijTo</span>
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-700 text-lg mb-1">
              Nazwa użytkownika
            </label>
            <input
              type="text"
              placeholder="Wprowadź login"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-slate-700 text-lg mb-1">Hasło</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Zaloguj się"
            )}
          </button>
          <div className="text-center mt-4">
            <Link
              to="/signup"
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              Nie masz konta? Zarejestruj się
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
