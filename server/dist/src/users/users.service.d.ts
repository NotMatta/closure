import { User } from '@prisma/client';
export declare class UsersService {
    findById(id: string | undefined): Promise<User>;
    findAll(): string;
    createUser(data: Partial<User>): Promise<Partial<User>>;
}
