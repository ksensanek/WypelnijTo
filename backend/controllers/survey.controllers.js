import Survey from "../models/survey.model.js";
import Question from "../models/question.model.js";

export const createSurvey = async (req, res) => {
  try {
    const { title, description, endDate, status, questions } = req.body;

    if (new Date(endDate) <= new Date()) {
      return res
        .status(400)
        .json({ error: "Data zakończenia ankiety musi być w przyszłości" });
    }

    const newSurvey = new Survey({
      title,
      description,
      endDate,
      status: status || "draft",
      authorId: req.user._id,
    });

    await newSurvey.save();

    const questionIds = [];

    if (Array.isArray(questions)) {
      for (const q of questions) {
        const newQuestion = new Question({
          surveyId: newSurvey._id,
          type: q.type,
          questionText: q.questionText,
          options: q.options || [],
          scaleMax: q.scaleMax || null,
        });

        await newQuestion.save();
        questionIds.push(newQuestion._id);
      }

      newSurvey.questions = questionIds;
      await newSurvey.save();
    }

    const populatedSurvey = await Survey.findById(newSurvey._id).populate(
      "questions"
    );
    res.status(201).json(populatedSurvey);
  } catch (error) {
    console.error("Błąd w kontrolerze tworzenia ankiety", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const updateSurvey = async (req, res) => {
  try {
    const { questions } = req.body;
    const updatedSurvey = await Survey.findByIdAndUpdate(
      req.params.id,
      { $set: { questions } },
      { new: true }
    );
    if (!updatedSurvey) {
      return res.status(404).json({ error: "Nie znaleziono ankiety" });
    }
    res.status(200).json(updatedSurvey);
  } catch (error) {
    console.error("Błąd aktualizacji ankiety", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ authorId: req.user._id }).populate(
      "questions"
    );
    res.status(200).json(surveys);
  } catch (error) {
    console.error("Błąd podczas pobierania ankiet:", error.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
};

export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Błąd podczas pobierania wszystkich ankiet" });
  }
};

export const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id).populate("questions");

    if (!survey) {
      return res.status(404).json({ error: "Ankieta nie została znaleziona." });
    }

    res.json(survey);
  } catch (err) {
    res.status(500).json({ error: "Błąd serwera." });
  }
};
