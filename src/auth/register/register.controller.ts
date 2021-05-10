import { Request, Response } from "express";

import { ResponseError } from "@interface/response.dto";
import { validateParameters, registerService } from "./register.service";
import BaseController from "@shared/base.controller";
import pl from "@locale/pl";

class RegisterController extends BaseController {
  protected validate = (requestBody: any): Promise<ResponseError[]> => {
    const { email } = requestBody;

    try {
      return validateParameters(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  executeImpl = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const response = await registerService(email, password);

      if (response.errors.length > 0) {
        return this.clientError(res, response);
      }

      return this.ok(res, response);
    } catch (error) {
      console.log(error);
      this.fail(res, pl.unexpectedError);
    }
  };
}

export default RegisterController;
