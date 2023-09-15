import {ErrorType} from './interfaces/ErrorType';

class HttpErrorHandling {

  static CODE : string = 'ERROR_HTTP';
  static invalidPayload() : ErrorType {
    return ({
      'code': HttpErrorHandling.CODE,
      'message': 'invalid payload'
    }) as ErrorType;
  }

  static customError(message: string) : ErrorType {
    return ({
      code:  HttpErrorHandling.CODE,
      message
    }) as ErrorType;
  }
}

export default HttpErrorHandling;