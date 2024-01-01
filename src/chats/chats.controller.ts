import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService, MessageResponse } from './chats.service';
import { MessageDto } from './dto/message-dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * @description Responsible for handling all requests to the /chats endpoint
 */
@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  @ApiTags('chats')
  @ApiOperation({ summary: 'Get a greeting message' })
  @ApiParam({ name: 'userId', description: 'User ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Greeting message',
    type: MessageResponse,
  })
  @Get(':userId')
  fetchGreetingsResponse(
    @Param('userId') userId: string,
  ): Promise<MessageResponse> {
    return this.chatsService.fetchResponse(+userId, 'Hello');
  }

  @ApiTags('chats')
  @ApiOperation({
    summary:
      "Get a response to a user's message. Performs necessary database operations if need be.",
  })
  @ApiResponse({
    status: 201,
    description: 'Message response',
    type: MessageResponse,
  })
  @ApiParam({ name: 'userId', description: 'User ID', example: 1 })
  @ApiBody({ type: MessageDto })
  @Post(':userId')
  fetchMessageResponse(
    @Param('userId') userId: string,
    @Body() message: MessageDto,
  ): Promise<MessageResponse> {
    return this.chatsService.fetchResponse(+userId, message.text);
  }
}
