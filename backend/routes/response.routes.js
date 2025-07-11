import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import {
  submitResponse,
  getUserResponses,
  getSurveyResponses,
} from "../controllers/response.controller.js";

const router = express.Router();

router.post("/:surveyId", protectRoutes, submitResponse);

router.get("/user", protectRoutes, getUserResponses);
router.get("/survey/:surveyId", protectRoutes, getSurveyResponses);

export default router;
