import { NextFunction, Request, Response } from "express";

import { ResponseDTO } from "@interface/response.dto";
import { validateParameters, registerService } from "./register/register.service";

export const validateParams = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    const errors = await validateParameters(email);

    if (errors.length > 0) {
      return res.status(400).json(ResponseDTO.setError(errors));
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(ResponseDTO.setErrorMessage(error.message));
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await registerService(email, password);
    if (response.errors.length > 0) {
      return res.status(400).json(response);
    }
    return res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(ResponseDTO.setErrorMessage(error.message));
  }
};
