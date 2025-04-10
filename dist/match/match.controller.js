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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const me_decorator_1 = require("../me/me.decorator");
const jwt_1 = require("@nestjs/jwt");
const response_dto_1 = require("../@shared/dtos/response.dto");
const messages_constant_1 = require("../@shared/constants/messages.constant");
const errors_constant_1 = require("../@shared/constants/errors.constant");
const swagger_1 = require("@nestjs/swagger");
let MatchController = class MatchController {
    constructor(matchService, jwtService) {
        this.matchService = matchService;
        this.jwtService = jwtService;
    }
    async nearbyMatches(me, maxDistance) {
        const userPayload = this.jwtService.decode(me);
        const nearbyMatches = await this.matchService.nearbyMatches(userPayload.mobileNo, maxDistance);
        if (nearbyMatches) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, nearbyMatches);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async nearbyFind(me, maxDistance) {
        const userPayload = this.jwtService.decode(me);
        const nearbyMatches = await this.matchService.nearbyFind(userPayload.mobileNo, {}, maxDistance);
        if (nearbyMatches) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, nearbyMatches);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async nearbyFindAny(me, maxDistance, count) {
        const userPayload = this.jwtService.decode(me);
        const nearbyMatches = await this.matchService.findNearestUnmatchedUser(userPayload.userId, maxDistance);
        if (nearbyMatches) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, nearbyMatches);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async findNearbyMatchesWithPreferences(me, maxDistance) {
        const userPayload = this.jwtService.decode(me);
        const nearbyMatches = await this.matchService.findNearestUnmatchedUser(userPayload.mobileNo, maxDistance);
        if (nearbyMatches) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, nearbyMatches);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async findMatchPreferences(me, mobileNo) {
        const userPayload = this.jwtService.decode(me);
        const preferences = await this.matchService.findMatchPreferences(mobileNo);
        if (preferences) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, preferences);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async findNearbyMatchUser(me, matchedUserId) {
        const userPayload = this.jwtService.decode(me);
        const location = await this.matchService.findNearbyMatchedUser(userPayload.mobileNo, matchedUserId, 100);
        if (location) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, location);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async createWish(me, findUserId) {
        const userPayload = this.jwtService.decode(me);
        const wish = await this.matchService.createWish(userPayload.userId, findUserId);
        if (wish) {
            if (wish.isMatched) {
                return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_MATCHED, wish);
            }
            else {
                return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_CREATED, wish);
            }
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_CREATE_RETRY);
        }
    }
    async isMatched(me, findUserId) {
        const userPayload = this.jwtService.decode(me);
        const wish = await this.matchService.isMatched(userPayload.userId, findUserId);
        if (wish) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_MATCHED, {
                isMatched: true,
            }, 200);
        }
        else {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, {
                isMatched: false,
            }, 200);
        }
    }
    async unmatch(me, findUserId) {
        const userPayload = this.jwtService.decode(me);
        const wish = await this.matchService.createUnMatch(userPayload.userId, findUserId);
        if (wish) {
            if (wish.isMatched) {
                return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_UNMATCHED, wish);
            }
            else {
                return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_CREATED, wish);
            }
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_CREATE_RETRY);
        }
    }
    async report(me, findUserId) {
        const userPayload = this.jwtService.decode(me);
        const wish = await this.matchService.reportUser(userPayload.userId, findUserId);
        if (wish) {
            if (wish.isMatched) {
                return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_MATCHED, wish);
            }
            else {
                return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_CREATED, wish);
            }
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_CREATE_RETRY);
        }
    }
};
__decorate([
    (0, common_1.Get)("nearby-match"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Query)("maxDistance")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "nearbyMatches", null);
__decorate([
    (0, common_1.Get)("nearby-find"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Query)("maxDistance")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "nearbyFind", null);
__decorate([
    (0, common_1.Get)("nearby-find-random"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Query)("maxDistance")),
    __param(2, (0, common_1.Query)("count")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "nearbyFindAny", null);
__decorate([
    (0, common_1.Get)("nearby-preferences"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Query)("maxDistance")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findNearbyMatchesWithPreferences", null);
__decorate([
    (0, common_1.Get)("preferences"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Query)("mobileNo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findMatchPreferences", null);
__decorate([
    (0, common_1.Get)("matches/:userId"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findNearbyMatchUser", null);
__decorate([
    (0, common_1.Post)("wish/:userId"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "createWish", null);
__decorate([
    (0, common_1.Post)("is-matched/:userId"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "isMatched", null);
__decorate([
    (0, common_1.Post)("unmatch/:userId"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "unmatch", null);
__decorate([
    (0, common_1.Post)("report/:userId"),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "report", null);
MatchController = __decorate([
    (0, swagger_1.ApiTags)("Match APIs"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [match_service_1.MatchService,
        jwt_1.JwtService])
], MatchController);
exports.MatchController = MatchController;
//# sourceMappingURL=match.controller.js.map