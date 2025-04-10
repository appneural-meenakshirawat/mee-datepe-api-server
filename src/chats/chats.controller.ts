import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Message } from 'src/@shared/constants/messages.constant';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
import { Me } from 'src/me/me.decorator';
// import { Me } from '../@decorators/me.decorator';
import { ChatsService } from './chats.service';
import { CreateRoomDto } from './dto/chat-room.dto';
import { CreateChatDto } from './dto/chat.dto';
import { ErrorMessage } from 'src/@shared/constants/errors.constant';

@ApiTags('Chats APIs')
@ApiBearerAuth()
@Controller()
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private jwtService: JwtService,
  ) {}

  @Post('chat-list')
  async createRooom(
    @Body() roomDto: CreateRoomDto,
    @Me() me: string,
  ): Promise<any> {
    
    const userPayload: any = this.jwtService.decode(me);
    roomDto.meId = userPayload.userId;

    const data = await this.chatsService.createRoom(roomDto);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, data);
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_CREATE_RETRY);
    }
  }

  @Get('chat-list')
  async getRooms(
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatsService.getRooms(userPayload.userId); //byUsers
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get('find-room')
  async getRoom(
    @Me() me: string,
    @Query('byUsers') byUsers: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.chatsService.findRoom(byUsers, userPayload.userId); //byUsers
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get(':roomId/chats')
  async getChats(
    @Param('roomId') roomId: string,
    @Me() me: string,
    // @Query('byUsers') byUsers: string,
  ): Promise<any> {
    const data = await this.chatsService.getChats(roomId); //byUsers

    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_CREATE_RETRY);
    }
  }

  @Post(':roomId')
  async createChat(
    @Param('roomId') roomId: string,
    @Body() chatDto: CreateChatDto,
    @Me() me: string,
  ): Promise<any> {
    const userPayload: any = this.jwtService.decode(me);
    chatDto.sentBy = userPayload.userId;
    const data = await this.chatsService.createChat(roomId, chatDto);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, data);
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_CREATE_RETRY);
    }
  }
}
