"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_client_1 = require("../../prisma/prisma-client");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        if (!loginDto.username || !loginDto.password) {
            throw new common_1.BadRequestException('Username and password are required');
        }
        const user = await this.usersService.findByUsername(loginDto.username);
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const accessToken = await this.jwtService.signAsync({ username: loginDto.username });
        return { accessToken };
    }
    async register(registerDto) {
        if (!registerDto.username || !registerDto.password) {
            throw new Error('Username and password are required');
        }
        const existingUser = await prisma_client_1.default.user.findFirst({
            where: { username: registerDto.username },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Username already exists');
        }
        await this.usersService.createUser({
            username: registerDto.username,
            password: registerDto.password,
        });
        const accessToken = await this.jwtService.signAsync({ username: registerDto.username });
        return { accessToken };
    }
    async validateToken(token) {
        try {
            await this.jwtService.verifyAsync(token);
            return { valid: true };
        }
        catch (error) {
            return { valid: false };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map