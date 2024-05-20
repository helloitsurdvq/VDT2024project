const mongoose = require("mongoose");
const { Schema } = mongoose;
const traineeSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Nam", "Nữ", "Không rõ"],
    },
    school: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Trainee", traineeSchema);
