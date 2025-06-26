import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    validateToken(token: {
        accessToken: string;
    }): Promise<{
        valid: boolean;
    }>;
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
}
