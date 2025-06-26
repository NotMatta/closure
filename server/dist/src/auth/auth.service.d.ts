import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    register(registerDto: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    validateToken(token: string): Promise<{
        valid: boolean;
    }>;
}
