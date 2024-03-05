import Joi from "joi";
import { User } from "../models/userSchema.models";
import BaseValidations from "./base.validation";

class UserValidation extends BaseValidations {
  public SignInValidation = Joi.object({
    password: this.passwordSchema,
    email: this.emailSchema.optional(),
    username: this.usernameSchema.optional(),
  })
    .xor("email", "username")
    .messages({
      "object.missing": "Please provide either email or username for login.",
    });

  public SignUpValidation = Joi.object({
    fullName: this.fullNameSchema,
    password: this.passwordSchema,
    email: this.emailSchema.external(async (email) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error(`Email already in use! ${email}`);
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }),
    username: this.usernameSchema.external(async (username) => {
      try {
        const user = await User.findOne({ username });
        if (user) {
          throw new Error(`Username already in use ${username}`);
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }),
  });

  public ForgetPasswordValidation = Joi.object({
    email: this.emailSchema.optional(),
    username: this.usernameSchema.optional(),
  })
    .xor("email", "username")
    .messages({
      "object.missing": "Please provide either email or username for login.",
    });

  public ResetPasswordValidation = Joi.object({
    userId: { id: this.IdSchema },
    newPassword: this.passwordSchema,
  });

  public UpdatePassword = Joi.object({
    id: this.IdSchema,
    oldPassword: this.passwordSchema,
    newPassword: this.passwordSchema,
  });
}

export default UserValidation;
