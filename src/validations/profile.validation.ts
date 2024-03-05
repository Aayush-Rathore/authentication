import Joi from "joi";
import BaseValidations from "./base.validation";

class ProfileValidation extends BaseValidations {
  public UpdatePassword = Joi.object({
    oldPassword: this.passwordSchema,
    newPassword: this.passwordSchema,
  });
}

export default ProfileValidation;
