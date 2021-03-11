export interface IResponse<T> {
  data: T;
}

export class HttpError {
  public status: number;
  public message: string;
}

export class HttpNotFountError extends HttpError {
  constructor (message: string) {
    super();
    this.status = 404;
    this.message = message;
  }
}
