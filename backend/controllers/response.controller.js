import Response from "../models/response.model.js";

export const submitResponse = async (req, res) => {
  try {
    const { answers } = req.body;
    const { surveyId } = req.params;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "Odpowiedzi muszą być tablicą" });
    }

    const newResponse = new Response({
      surveyId,
      user: req.user._id,
      answers,
    });

    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    console.error("Błąd w kontrolerze przesyłania odpowiedzi", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const getUserResponses = async (req, res) => {
  try {
    const responses = await Response.find({ userId: req.user._id });
    res.status(200).json(responses);
  } catch (error) {
    console.error(
      "Błąd w kontrolerze pobierania odpowiedzi użytkownika",
      error
    );
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export const getSurveyResponses = async (req, res) => {
  try {
    const responses = await Response.find({ surveyId: req.params.surveyId });
    res.status(200).json(responses);
  } catch (error) {
    console.error("Błąd w kontrolerze pobierania odpowiedzi ankiety", error);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};
