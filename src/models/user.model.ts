import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [true, "Username is Required"],
    unique: [true, "Username should be unique"],
  },
  email: {
    type: String,
    require: [true, "Username is Required"],
    unique: [true, "Username should be unique"],
  },
  password: {
    type: String,
    require: [true, "Username is Required"],
  },
  isVerified: {
    type: Boolean,
    require: [true, "Username is Required"],
    default: false,
  },
  isAdmin: {
    type: Boolean,
    require: [true, "isAdmin is Required"],
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  VerifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
