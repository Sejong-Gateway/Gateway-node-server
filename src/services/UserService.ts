import { User } from '../models';
import { Service, Inject } from 'typedi';
import { getConnection } from 'typeorm';
import { BaseService } from './BaseService';

export interface IuserDTO {
    firstName: string;
    lastName: string;
    age: number;
}

@Service()
export default class UserService extends BaseService<User> {
    constructor(){
        super(User);
    }

    async create(userDTO: Partial<IuserDTO>): Promise<User> {
        const newUser = this.genericRepository.save(userDTO);
        return newUser;
    }
}