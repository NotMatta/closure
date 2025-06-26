import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import prisma from 'prisma/prisma-client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: { username: string; password: string }): Promise<{ accessToken: string }> {
    if (!loginDto.username || !loginDto.password) {
      throw new BadRequestException('Username and password are required');
    }
    const user = await this.usersService.findByUsername(loginDto.username);
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const accessToken = await this.jwtService.signAsync({ username: loginDto.username });
    return { accessToken };
  }


  async register(registerDto: { username: string; password: string }): Promise<{ accessToken: string }> {
    if (!registerDto.username || !registerDto.password) {
      throw new Error('Username and password are required');
    }
    const existingUser = await prisma.user.findFirst({
      where: { username: registerDto.username },
    });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    await this.usersService.createUser({
      username: registerDto.username,
      password: registerDto.password,
    });
    const accessToken = await this.jwtService.signAsync({ username: registerDto.username });
    return { accessToken };
  }


  async validateToken(token: string): Promise<{ valid: boolean }> {
    try {
      await this.jwtService.verifyAsync(token);
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  }
}
