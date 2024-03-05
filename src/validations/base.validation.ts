import Joi from "joi";

class BaseValidations {
  protected IdSchema = Joi.string();

  protected passwordSchema = Joi.string()
    .min(5)
    .max(16)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{5,16}$/
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 5 and 16 characters long.",
    });

  protected emailSchema = Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
  });

  protected usernameSchema = Joi.string()
    .lowercase()
    .regex(/^[a-z0-9_.-]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.pattern.base":
        "Username must be in lowercase and may contain only underscores, dots, or hyphens.",
      "string.min": "Username must be at least {#limit} characters long.",
      "string.max": "Username cannot exceed {#limit} characters.",
    });

  protected fullNameSchema = Joi.string().min(3).max(50).required().messages({
    "string.min": "Full name must be at least {#limit} characters long.",
    "string.max": "Full name cannot exceed {#limit} characters.",
  });
}

export default BaseValidations;
