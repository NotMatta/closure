import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
}
