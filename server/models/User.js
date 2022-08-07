import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
  },
  roles: {
    User: {
      type: Number,
      default: 400,
    },
    Editor: Number,
    Admin: Number,
  },
});

export default mongoose.model("User", userSchema);
