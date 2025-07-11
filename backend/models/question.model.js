import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },

    type: {
      type: String,
      enum: ["single_choice", "multiple_choice", "scale", "text", "rating"],
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      default: [],
      set: (value) => [...new Set(value)].filter(Boolean),
    },

    scaleMax: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
