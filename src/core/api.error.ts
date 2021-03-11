interface Error {
  message: string;
  code: number;
}

export default class ApiError {
  public error: Error;
  constructor (message: string, code: number) {
    this.error = {
      message,
      code
    };
  }
}
