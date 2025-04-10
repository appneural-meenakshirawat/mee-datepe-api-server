import { MatchService } from "./match.service";
import { JwtService } from "@nestjs/jwt";
import { ResponseError, ResponseSuccess } from "src/@shared/dtos/response.dto";
export declare class MatchController {
    private readonly matchService;
    private jwtService;
    constructor(matchService: MatchService, jwtService: JwtService);
    nearbyMatches(me: string, maxDistance: number): Promise<ResponseError | ResponseSuccess>;
    nearbyFind(me: string, maxDistance: number): Promise<ResponseError | ResponseSuccess>;
    nearbyFindAny(me: string, maxDistance: number, count: string): Promise<ResponseError | ResponseSuccess>;
    findNearbyMatchesWithPreferences(me: string, maxDistance: number): Promise<ResponseError | ResponseSuccess>;
    findMatchPreferences(me: string, mobileNo: string): Promise<ResponseError | ResponseSuccess>;
    findNearbyMatchUser(me: string, matchedUserId: string): Promise<ResponseError | ResponseSuccess>;
    createWish(me: string, findUserId: string): Promise<ResponseError | ResponseSuccess>;
    isMatched(me: string, findUserId: string): Promise<ResponseSuccess>;
    unmatch(me: string, findUserId: string): Promise<ResponseError | ResponseSuccess>;
    report(me: string, findUserId: string): Promise<ResponseError | ResponseSuccess>;
}
