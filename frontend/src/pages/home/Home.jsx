import zdj1 from "../../assets/images/zdj1.png";
import zdj2 from "../../assets/images/zdj2.png";
import zdj3 from "../../assets/images/zdj3.png";
import zdj4 from "../../assets/images/zdj4.png";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const Home = () => {
  const handleCreateSurvey = useAuthRedirect();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-slate-200 text-gray-800">
      <header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between backdrop-blur-md bg-slate-900/60 z-50 shadow-md">
        <h1 className="text-4xl font-extrabold text-white">
          <span className="text-slate-300">Wypełnij</span>
          <span className="text-white">To!</span>
        </h1>
        <nav className="hidden md:flex gap-6 text-2xl font-medium text-white">
          <a href="#omowienie" className="hover:text-slate-300 transition ">
            Omówienie
          </a>
          <a href="#funkcje" className="hover:text-slate-300 transition">
            Funkcje
          </a>
          <a href="#kAnkiet" className="hover:text-slate-300 transition">
            Kreator Ankiet
          </a>
          <a href="#kontakt" className="hover:text-slate-300 transition">
            Kontakt
          </a>
        </nav>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
            onClick={() => (window.location.href = "/login")}
          >
            Zaloguj się
          </button>
          <button
            className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-200 transition"
            onClick={() => (window.location.href = "/signup")}
          >
            Zarejestruj się
          </button>
        </div>
      </header>
      <main className="mt-28 space-y-32 px-6 md:px-20">
        <section
          id="omowienie"
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-7xl font-bold">Jesteś studentem?</h2>
            <p className="text-3xl">
              Szybko potrzebujesz zrobić ankietę? Znajdziesz je tutaj!
            </p>
            <p className="text-lg">
              Dzięki prostemu w obsłudze narzędziu stworzysz ankietę w kilka
              chwil. Idealne na badania do projektów, prac zaliczeniowych czy po
              prostu do poznania opinii innych.
            </p>
            <p className="text-lg">
              Rozpocznij już teraz i zobacz, jak łatwo można zorganizować
              profesjonalną ankietę!
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-slate-700 text-white px-6 py-2 rounded-md hover:bg-slate-800"
                onClick={handleCreateSurvey}
              >
                Stwórz ankietę
              </button>
              <button
                className="bg-white text-slate-900 px-6 py-2 rounded-md border border-slate-700 hover:bg-slate-100"
                onClick={() => (window.location.href = "/signup")}
              >
                Załóż konto
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={zdj1}
              alt="Ankieta"
              className="max-h-[900px] object-contain"
            />
          </div>
        </section>
        <section id="funkcje" className="space-y-32">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 flex justify-center">
              <img
                src={zdj2}
                alt="Ankieta"
                className="max-h-[600px] object-contain"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-6xl font-bold">
                Tworzenie ankiet tak proste jak pisanie notatek
              </h2>
              <p className="text-2xl">
                Wybieraj spośród różnych typów pytań, zmieniaj ich kolejność
                jednym ruchem i dostosuj treść, Dzięki prostemu interfejsowi
                możesz tworzyć pytania w dowolnej kolejności, a także łatwo
                edytować treść pytań i odpowiedzi. Personalizuj pytania,
                wybierając różne formaty
              </p>
              <p className="text-3xl font-semibold">Szybko i wygodnie.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-6xl font-bold">Szybka analiza odpowiedzi</h2>
              <p className="text-2xl">
                Po przetworzeniu otrzymanych odpowiedzi, dane zostaną
                przedstawione w formie przejrzystych raportów i paneli
                wizualnych. To narzędzie pozwala zaoszczędzić czas, prezentując
                dane w sposób zrozumiały i atrakcyjny wizualnie."
              </p>
              <p className="text-3xl font-semibold">Przejrzyste dane</p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={zdj3}
                alt="Analiza"
                className="max-h-[600px] object-contain"
              />
            </div>
          </div>
        </section>
        <section
          id="kAnkiet"
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2 flex justify-center">
            <img
              src={zdj4}
              alt="Kreator"
              className="max-h-[900px] object-contain"
            />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-6xl font-bold">
              Stwórz ankietę, zbierz dane, przeanalizuj wyniki i przygotuj
              raport
            </h2>
          </div>
        </section>
        <footer
          id="kontakt"
          className="bg-slate-800 text-white py-12 mt-20 rounded-t-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10">
            {[
              {
                title: "Podstawowe informacje",
                items: ["Kontakt", "O nas", "Regulamin & Polityka prywatności"],
              },
              {
                title: "Nawigacja & Linki",
                items: ["Jak to działa", "FAQ", "Integracje"],
              },
              {
                title: "Zachęta do działania",
                items: ["Newsletter", "CTA", "Opinie użytkowników"],
              },
              {
                title: "Zaufanie & Bezpieczeństwo",
                items: [
                  "Bezpieczeństwo danych",
                  "Certyfikaty",
                  "Opinie i referencje",
                ],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-slate-300 cursor-pointer transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
