export interface ResponseError {
  field: string;
  message: string;
}

export class ResponseDTO {
  static setError(errors: ResponseError[]) {
    return { errors, body: null };
  }

  static setErrorMessage(msg: string) {
    return { errors: [{ field: "", message: msg }], body: null };
  }

  static setBody(body: any) {
    return { errors: <ResponseError[]>[], body };
  }
}
