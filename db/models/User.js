import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);
userSchema.methods.hashPassword = async function () {
  this.password = await bcryptjs.hash(this.password, 10);
};
userSchema.methods.comparePassword = async function (pass) {
  const isPasswordEquals = await bcryptjs.compare(pass, this.password);
  return isPasswordEquals;
};
export const User = model("user", userSchema);
