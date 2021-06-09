import { User } from '../models';
import {Service, Container} from 'typedi';
import { BaseService } from './BaseService';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import CollageService from "./CollageService";
import DepartmentService from "./DepartmentService";
import SubjectService from "./SubjectService";
import jwt from 'jsonwebtoken';
import config from '../config';

export interface IuserDTO {
    studentId: string;
    password: string;
    isAbeek: boolean;
    collageUUID: string;
    departmentUUID: string;
    currentSubjectUUIDs: string[];
    completeSubjectUUIDs: string[];
    remainSubjectUUIDs: string[];
    categoryUUIDs: string[];
}

@Service()
export default class UserService extends BaseService<User> {
    constructor(

    ){
        super(User);
    }

    async signUp(userDTO: Partial<IuserDTO>): Promise<{user, token: string}>{

        const payload: Partial<User> = {
            ...userDTO
        };

        const collageService = Container.get(CollageService);
        const subjectService = Container.get(SubjectService);
        const departmentService = Container.get(DepartmentService);

        payload.collage = await collageService.getByUUID(userDTO.collageUUID, []);
        payload.department = await departmentService.getByUUID(userDTO.departmentUUID, []);
        payload.completeSubjects = await subjectService.getByUUIDs(userDTO.completeSubjectUUIDs, []);
        payload.remainSubjects = await subjectService.getByUUIDs(userDTO.remainSubjectUUIDs, []);
        payload.currentSubjects = await subjectService.getByUUIDs(userDTO.currentSubjectUUIDs, []);

        const salt = randomBytes(32);

        payload.password = await argon2.hash(userDTO.password, { salt });
        payload.categories = [];

        const user = this.genericRepository.save({
            ...payload,
            salt: salt.toString('hex')
        });

        const token = this.generateToken(user);

        return {user, token};
    }

    private generateToken(user){
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        // this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jwt.sign(
            {
                _id: user.uuid, // We are gonna use this in the middleware 'isAuth'
                studentId: user.studentId,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret
        );
    }
}