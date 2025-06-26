"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_client_1 = require("../../prisma/prisma-client");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    async findById(id) {
        if (!id) {
            throw new common_1.BadRequestException('User ID is required');
        }
        const foundUser = await prisma_client_1.default.user.findUnique({
            where: { id },
        });
        if (!foundUser) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return foundUser;
    }
    findAll() {
        return 'List of all users';
    }
    async createUser(data) {
        if (!data.email || !data.name || !data.password) {
            throw new common_1.BadRequestException('Email, name, and password are required');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = { ...data, password: hashedPassword };
        console.log('Creating user with data:', newUser);
        return newUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map