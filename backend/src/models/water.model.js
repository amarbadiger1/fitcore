import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    default: 0
  },

  date: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const waterModel = mongoose.model(
  "Water",
  waterSchema
);

export default waterModel;