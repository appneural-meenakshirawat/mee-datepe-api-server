"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const response_dto_1 = require("../dtos/response.dto");
const error_codes_constant_1 = require("../constants/error-codes.constant");
let AllExceptionFilter = class AllExceptionFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = exception.status || 400;
        if (error_codes_constant_1.ErrorCodes[exception] && error_codes_constant_1.ErrorCodes[exception].statusCode) {
            status = error_codes_constant_1.ErrorCodes[exception].statusCode;
        }
        response
            .status(status)
            .json(new response_dto_1.ResponseError(!(exception === null || exception === void 0 ? void 0 : exception.message) ? exception : exception.message, request.url, exception.errors));
    }
};
AllExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all-exception.filter.js.map