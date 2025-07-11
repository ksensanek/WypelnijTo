import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import {
  createQuestion,
  deleteQuestion,
  getQuestionsBySurvey,
  updateQuestion,
  updateQuestionById,
} from "../controllers/question.controllers.js";

const router = express.Router();

router.post("/", protectRoutes, createQuestion);
router.get("/survey/:surveyId", protectRoutes, getQuestionsBySurvey);
router.get("/:id", protectRoutes, updateQuestionById);
router.put("/:id", protectRoutes, updateQuestion);
router.delete("/:id", protectRoutes, deleteQuestion);

export default router;
