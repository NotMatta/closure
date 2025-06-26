import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): string {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param("id") id : string | undefined): Promise<User> {
    return await this.usersService.findById(id);
  }
}
