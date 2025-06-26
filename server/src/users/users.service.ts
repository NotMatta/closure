import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import prisma from 'prisma/prisma-client';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  async findById(id: string | undefined): Promise<User> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }
    const foundUser =  await prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return foundUser;
  }

  async findByUsername(username: string): Promise<User> {
    if (!username) {
      throw new BadRequestException('Username is required');
    }
    const foundUser = await prisma.user.findFirst({
      where: { username },
    });
    if( !foundUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return foundUser;
  }

  findAll(): string {
    return 'List of all users';
  }

  async createUser(data : {username: string | undefined, password:string | undefined}): Promise<string> {
    if (!data.username || !data.password) {
      throw new BadRequestException('Userame, and password are required');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = { username: data.username, password: hashedPassword };
    const createdUser = await prisma.user.create({
      data: newUser,
    })
    return `User ${createdUser.username} created successfully`;
  }
}
