import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService, MessageResponse } from './chats.service';
import { MessageDto } from './dto/message-dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  @Get(':userId')
  fetchGreetingsResponse(
    @Param('userId') userId: string,
  ): Promise<MessageResponse> {
    return this.chatsService.fetchResponse(+userId, 'Hello');
  }
  @Post(':userId')
  fetchMessageResponse(
    @Param('userId') userId: string,
    @Body() message: MessageDto,
  ): Promise<MessageResponse> {
    return this.chatsService.fetchResponse(+userId, message.text);
  }
}
