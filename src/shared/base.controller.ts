import { NextFunction, Request, Response } from "express";
import { ResponseDTO, ResponseError } from "@interface/response.dto";
import pl from "@locale/pl";

abstract class BaseController {
  protected abstract executeImpl(req: Request, res: Response): Promise<void | any>;
  protected abstract validate(body: any): Promise<ResponseError[]>;

  validateParameters = async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
    try {
      const errors = await this.validate(req.body);

      if (errors.length > 0) {
        this.clientError(res, ResponseDTO.setError(errors));
      }

      next();
    } catch (error) {
      console.log(`[BaseController]: Uncaught controller error in function validateParameters`);
      console.log(error);
      this.fail(res, pl.unexpectedError);
    }
  };

  execute = async (req: Request, res: Response): Promise<void | any> => {
    try {
      await this.executeImpl(req, res);
    } catch (error) {
      console.log(`[BaseController]: Uncaught controller error in function execute`);
      console.log(error);
      this.fail(res, pl.unexpectedError);
    }
  };

  public static jsonResponse(res: Response, code: number, dto?: ResponseDTO) {
    if (!!dto) {
      return res.status(code).json(dto);
    } else {
      return res.sendStatus(code);
    }
  }

  ok(res: Response, dto?: ResponseDTO) {
    return BaseController.jsonResponse(res, 200, dto);
  }

  created(res: Response) {
    return res.sendStatus(201);
  }

  clientError(res: Response, dto?: ResponseDTO) {
    return BaseController.jsonResponse(res, 400, dto);
  }

  // unauthorized(res: Response, message?: string) {
  //   return BaseController.jsonResponse(res, 401, message ? message : "Unauthorized");
  // }

  fail(res: Response, error: Error | string) {
    console.log(error);
    return res.status(500).json(ResponseDTO.setErrorMessage(error.toString()));
  }
}

export default BaseController;
