import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
