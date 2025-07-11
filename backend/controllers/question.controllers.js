import Question from "../models/question.model.js";

export const createQuestion = async (req, res) => {
  try {
    const { surveyId, type, questionText, options, scaleMax } = req.body;

    if (
      !["single_choice", "multiple_choice", "scale", "text", "rating"].includes(
        type
      )
    ) {
      return res.status(400).json({ error: "Nieprawidłowy typ pytania" });
    }

    const newQuestion = new Question({
      surveyId,
      type,
      questionText,
      options,
      scaleMax,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Błąd w kontrolerze tworzenia pytania", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const getQuestionsBySurvey = async (req, res) => {
  try {
    const questions = await Question.find({ surveyId: req.params.surveyId });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Błąd w kontrolerze pobierania pytań", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const updateQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Nie znaleziono pytania" });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error("Błąd w kontrolerze aktualizacji pytania", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { questionText, options, scaleMax } = req.body;
    const updateQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        questionText,
        options,
        scaleMax,
      },
      { new: true }
    );
    if (!updateQuestion) {
      return res.status(404).json({ error: "Nie znaleziono pytania" });
    }
    res.status(200).json(updateQuestion);
  } catch (error) {
    console.error("Błąd w kontrolerze aktualizacji pytania", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const deleteQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deleteQuestion) {
      return res.status(404).json({ error: "Nie znaleziono pytania" });
    }
    res.status(200).json({ message: "Pytanie zostało usunięte" });
  } catch (error) {
    console.error("Błąd w kontrolerze usuwania pytania", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};
