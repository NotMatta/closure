import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  printMessage(message: string): string {
    return `Message: ${message}`;
  }
}
