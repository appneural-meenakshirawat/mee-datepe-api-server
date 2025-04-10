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
exports.OtpRequestSchema = exports.OtpRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let OtpRequest = class OtpRequest {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OtpRequest.prototype, "otp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 10, max: 10 }),
    __metadata("design:type", String)
], OtpRequest.prototype, "mobileNo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now, expires: 300 }),
    __metadata("design:type", Date)
], OtpRequest.prototype, "createdAt", void 0);
OtpRequest = __decorate([
    (0, mongoose_1.Schema)()
], OtpRequest);
exports.OtpRequest = OtpRequest;
exports.OtpRequestSchema = mongoose_1.SchemaFactory.createForClass(OtpRequest);
//# sourceMappingURL=otp-request.schema.js.map