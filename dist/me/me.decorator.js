"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Me = void 0;
const common_1 = require("@nestjs/common");
const errors_constant_1 = require("../@shared/constants/errors.constant");
exports.Me = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization
        ? request.headers.authorization.split(' ')[1]
        : null;
    if (!jwtToken)
        throw errors_constant_1.ErrorMessage.UNAUTHORIZED_ACCESS;
    return jwtToken;
});
//# sourceMappingURL=me.decorator.js.map