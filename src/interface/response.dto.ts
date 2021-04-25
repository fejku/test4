export interface ValidationError {
  field: string;
  message: string[];
}

export class ResponseDTO {
  static setError(errors: ValidationError[]) {
    return { errors, body: null };
  }

  static setErrorMessage(msg: string) {
    return { errors: [{ field: "", message: [msg] }], body: null };
  }

  static setBody(body: any) {
    return { errors: <ValidationError[]>[], body };
  }
}
