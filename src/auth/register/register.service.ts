import { validate } from "class-validator";

import locale from "@locale/pl";
import { User } from "@entity/User";
import { ResponseDTO, ResponseError } from "@interface/response.dto";

const isEmailUsed = async (email: string) => {
  try {
    const user = await User.findOne({ email });

    return !!user;
  } catch (error) {
    throw new Error(error);
  }
};

export const validateParameters = async (email: string) => {
  const errors: ResponseError[] = [];

  try {
    if (await isEmailUsed(email)) {
      const error = {
        field: "email",
        message: locale.emailUsed,
      };
      errors.push(error);
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
      const validateErrors = errors
        .map((error) => {
          const resultArray: ResponseError[] = [];

          for (const errorMessage of Object.values(error.constraints)) {
            const errorObject = {
              field: error.property,
              message: errorMessage,
            };
            resultArray.push(errorObject);
          }
          return resultArray;
        })
        .flat();

      return ResponseDTO.setError(validateErrors);
    }
    await user.save();

    // Return user
    return ResponseDTO.setBody(user);
  } catch (error) {
    throw new Error(error);
  }
};
