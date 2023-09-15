import {ErrorType} from './interfaces/ErrorType';

class DataAccessErrorHandling {

  static CODE : string = 'ERROR_DATA_ACCESS_API';
  static genericError() : ErrorType {
    return ({
      'code': DataAccessErrorHandling.CODE,
      'message': 'DataAccess API is unreachable'
    }) as ErrorType;
  }

  static customError(message: string) : ErrorType {
    return ({
      code:  DataAccessErrorHandling.CODE,
      message
    }) as ErrorType;
  }
}

export default DataAccessErrorHandling;