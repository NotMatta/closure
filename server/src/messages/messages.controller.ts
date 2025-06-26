import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  
  @UseGuards(AuthGuard)
  @Get('print/:message')
  printMessage(@Param('message') message: string): string {
    return this.messagesService.printMessage(message);
  }
}
