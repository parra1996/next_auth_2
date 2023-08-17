import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
    minLength: [6, "min 6 characters"],
  },
});

const User = models.User || model("User", UserSchema);
export default User;
