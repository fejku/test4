import { validate } from "class-validator";

import locale from "@locale/pl";
import { User } from "@entity/User";
import { ResponseDTO, ValidationError } from "@interface/response.dto";

const isEmailUsed = async (email: string) => {
  try {
    const user = await User.findOne({ email });

    return !!user;
  } catch (error) {
    throw new Error(error);
  }
};

export const validateParameters = async (email: string) => {
  const errors: ValidationError[] = [];

  try {
    if (await isEmailUsed(email)) {
      errors.push({
        field: "email",
        message: [locale.emailUsed],
      });
    }

    return errors;
  } catch (error) {
    throw new Error(error);
  }
};

export const registerService = async (email: string, password: string) => {
  try {
    // Create user
    const user = new User({
      email,
      password,
    });

    // Validate
    const errors = await validate(user);
    if (errors.length > 0) {
      const validateErrors = errors.map((error) => ({
        field: error.property,
        message: Object.values(error.constraints),
      }));
      return ResponseDTO.setError(validateErrors);
    }
    await user.save();

    // Return user
    return ResponseDTO.setBody(user);
  } catch (error) {
    throw new Error(error);
  }
};
