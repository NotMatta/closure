import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: { username: string; password: string }): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.signAsync({ username: loginDto.username });
    return { accessToken };
  }
}
