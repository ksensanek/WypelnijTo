import express from "express";
import {
  createSurvey,
  updateSurvey,
  getSurveys,
  getAllSurveys,
  getSurveyById,
} from "../controllers/survey.controllers.js";
import protectRoutes from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/", protectRoutes, createSurvey);
router.patch("/:id", protectRoutes, updateSurvey);
router.get("/", protectRoutes, getSurveys);
router.get("/all", getAllSurveys);
router.get("/:id", protectRoutes, getSurveyById);

export default router;
