"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccess = exports.ResponseError = void 0;
const common_1 = require("@nestjs/common");
const error_codes_constant_1 = require("../constants/error-codes.constant");
class ResponseError {
    constructor(errorCode, path, error, data) {
        this.statusCode = !error_codes_constant_1.ErrorCodes[errorCode]
            ? common_1.HttpStatus.BAD_REQUEST
            : error_codes_constant_1.ErrorCodes[errorCode].statusCode;
        this.success = false;
        this.message = !error_codes_constant_1.ErrorCodes[errorCode]
            ? errorCode
            : error_codes_constant_1.ErrorCodes[errorCode].message;
        this.error = error;
        this.data = data;
        this.path = path;
        console.warn(new Date().toString() +
            ' - [Response]: ' +
            errorCode +
            (error ? ' - ' + JSON.stringify(error) : ''));
    }
}
exports.ResponseError = ResponseError;
class ResponseSuccess {
    constructor(infoMessage, data, statusCode, notLog) {
        this.statusCode = statusCode | 200;
        this.success = true;
        this.message = infoMessage;
        this.data = data;
        if (!notLog) {
            try {
                const offuscateRequest = JSON.parse(JSON.stringify(data));
                if (offuscateRequest && offuscateRequest.token)
                    offuscateRequest.token = '*******';
            }
            catch (error) { }
        }
    }
}
exports.ResponseSuccess = ResponseSuccess;
//# sourceMappingURL=response.dto.js.map