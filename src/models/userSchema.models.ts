import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUND } from "../constants/constants.variable";
import IUser from "../interface/user.interface";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required!"],
      trim: true,
      index: true,
    },

    username: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Username is required!"],
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required!"],
    },

    profileUrl: {
      type: String,
    },

    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

    query: [{ type: Schema.Types.ObjectId, ref: "Query" }],

    creditScore: {
      type: Number,
      default: 0,
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, SALT_ROUND);

  next();
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateTempToken = async function () {
  return await jwt.sign({ id: this.id }, process.env.TEMP_TOKEN_KEY, {
    expiresIn: process.env.TEMP_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.removeSensitiveFields = function () {
  this.unset("password");
  this.unset("refreshToken");
};

export const User = mongoose.model<IUser>("User", userSchema);
