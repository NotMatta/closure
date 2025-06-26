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

  findAll(): string {
    return 'List of all users';
  }

  async createUser(data: Partial<User>): Promise<Partial<User>> {
    if (!data.email || !data.name || !data.password) {
      throw new BadRequestException('Email, name, and password are required');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = { ...data, password: hashedPassword };
    console.log('Creating user with data:', newUser);
    return newUser;
  }
}
