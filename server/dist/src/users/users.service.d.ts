import { User } from '@prisma/client';
export declare class UsersService {
    findById(id: string | undefined): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findAll(): string;
    createUser(data: {
        username: string | undefined;
        password: string | undefined;
    }): Promise<string>;
}
