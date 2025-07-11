import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { useState } from "react";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md bg-white/30 border border-slate-300">
        <h1 className="text-3xl font-semibold text-center text-slate-800 mb-6">
          <span className="text-slate-700">Zarejestruj się w</span>{" "}
          <span className="text-slate-900 font-extrabold">WypełnijTo</span>
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-700 text-lg mb-1">
              Imię i Nazwisko
            </label>
            <input
              type="text"
              placeholder="Wprowadź Imię i Nazwisko"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-slate-700 text-lg mb-1">Login</label>
            <input
              type="text"
              placeholder="Wprowadź login"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-slate-700 text-lg mb-1">Hasło</label>
            <input
              type="password"
              placeholder="Wprowadź hasło"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-slate-700 text-lg mb-1">
              Powtórz hasło
            </label>
            <input
              type="password"
              placeholder="Powtórz hasło"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <GenderCheckBox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Zarejestruj się
          </button>
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-sm text-slate-700 hover:text-slate-900 transition"
            >
              Masz już konto? Zaloguj się
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
