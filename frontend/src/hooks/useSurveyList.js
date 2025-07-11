import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const useSurveyList = () => {
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
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
          throw new Error(data.error || "Błąd podczas pobierania ankiet");
        }

        const mapped = data.map((s) => ({
          id: s._id,
          name: s.title,
          description: s.description || "Brak opisu",
          isAvailable: s.status === "active",
        }));

        setSurveys(mapped);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  return { loading, surveys };
};

export default useSurveyList;
