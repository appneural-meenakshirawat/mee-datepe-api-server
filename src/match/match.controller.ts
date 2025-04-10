import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { MatchService } from "./match.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { Me } from "src/me/me.decorator";
import { JwtService } from "@nestjs/jwt";
import { ResponseError, ResponseSuccess } from "src/@shared/dtos/response.dto";
import { Message } from "src/@shared/constants/messages.constant";
import { ErrorMessage } from "src/@shared/constants/errors.constant";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Match APIs")
@ApiBearerAuth()
@Controller()
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
    private jwtService: JwtService,
  ) {}

  @Get("nearby-match")
  async nearbyMatches(
    @Me() me: string,
    @Query("maxDistance") maxDistance: number
  ) {
    const userPayload: any = this.jwtService.decode(me);
    const nearbyMatches = await this.matchService.nearbyMatches(
      userPayload.mobileNo,
      maxDistance
    );
    if (nearbyMatches) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, nearbyMatches);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get("nearby-find")
  async nearbyFind(
    @Me() me: string,
    @Query("maxDistance") maxDistance: number
  ) {
    const userPayload: any = this.jwtService.decode(me);
    const nearbyMatches = await this.matchService.nearbyFind(
      userPayload.mobileNo,
      {},
      maxDistance
    );
    if (nearbyMatches) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, nearbyMatches);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get("nearby-find-random")
  async nearbyFindAny(
    @Me() me: string,
    @Query("maxDistance") maxDistance: number,
    @Query("count") count: string
  ) {
    const userPayload: any = this.jwtService.decode(me);
    const nearbyMatches = await this.matchService.findNearestUnmatchedUser(
      userPayload.userId,
      maxDistance
    );
    if (nearbyMatches) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, nearbyMatches);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get("nearby-preferences")
  async findNearbyMatchesWithPreferences(
    @Me() me: string,
    @Query("maxDistance") maxDistance: number
  ) {
    const userPayload: any = this.jwtService.decode(me);
    const nearbyMatches =
      await this.matchService.findNearestUnmatchedUser(
        userPayload.mobileNo,
        maxDistance
      );
    if (nearbyMatches) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, nearbyMatches);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get("preferences")
  async findMatchPreferences(
    @Me() me: string,
    @Query("mobileNo") mobileNo: string
  ) {
    const userPayload: any = this.jwtService.decode(me);
    const preferences = await this.matchService.findMatchPreferences(mobileNo);
    if (preferences) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, preferences);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get("matches/:userId")
  async findNearbyMatchUser(
    @Me() me: string,
    @Param("userId") matchedUserId: string
  ) {
    const userPayload: any = this.jwtService.decode(me);
    const location = await this.matchService.findNearbyMatchedUser(
      userPayload.mobileNo,
      matchedUserId,
      100
    );
    if (location) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, location);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Post("wish/:userId")
  async createWish(@Me() me: string, @Param("userId") findUserId: string) {
    const userPayload: any = this.jwtService.decode(me);
    const wish = await this.matchService.createWish(
      userPayload.userId,
      findUserId
    );

    if (wish) {
      if (wish.isMatched) {
        return new ResponseSuccess(Message.SUCCESSFULLY_MATCHED, wish);
      } else {
        return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, wish);
      }
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_CREATE_RETRY);
    }
  }

  @Post("is-matched/:userId")
  async isMatched(@Me() me: string, @Param("userId") findUserId: string) {
    const userPayload: any = this.jwtService.decode(me);
    const wish = await this.matchService.isMatched(
      userPayload.userId,
      findUserId
    );
    if (wish) {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_MATCHED,
        {
          isMatched: true,
        },
        200
      );
    } else {
      return new ResponseSuccess(
        Message.SUCCESSFULLY_FOUND,
        {
          isMatched: false,
        },
        200
      );
    }
  }

  @Post("unmatch/:userId")
  async unmatch(@Me() me: string, @Param("userId") findUserId: string) {
    const userPayload: any = this.jwtService.decode(me);
    const wish = await this.matchService.createUnMatch(
      userPayload.userId,
      findUserId
    );
    if (wish) {
      if (wish.isMatched) {
        return new ResponseSuccess(Message.SUCCESSFULLY_UNMATCHED, wish);
      } else {
        return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, wish);
      }
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_CREATE_RETRY);
    }
  }

  @Post("report/:userId")
  async report(@Me() me: string, @Param("userId") findUserId: string) {
    const userPayload: any = this.jwtService.decode(me);
    const wish = await this.matchService.reportUser(
      userPayload.userId,
      findUserId
    );
    if (wish) {
      if (wish.isMatched) {
        return new ResponseSuccess(Message.SUCCESSFULLY_MATCHED, wish);
      } else {
        return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, wish);
      }
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_CREATE_RETRY);
    }
  }
}
