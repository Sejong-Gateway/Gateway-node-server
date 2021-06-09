import {Service, Inject, Container} from 'typedi';
import { BaseService } from './BaseService';
import CollageService from "./CollageService";
import {Subject} from "../models/Subject";
import DepartmentService from "./DepartmentService";

export interface IsubjectDTO {
    name: string;
    credit: number;
    type: string;
    grade: number;
    departmentUUID: string;
    collageUUID: string;
    semester: number
}

@Service()
export default class SubjectService extends BaseService<Subject> {
    constructor(){
        super(Subject);
    }

    async create(subjectDTO: Partial<IsubjectDTO>): Promise<Subject> {
        const departmentService = Container.get(DepartmentService);
        const department = await departmentService.getByUUID(subjectDTO.departmentUUID, ['collage']);

        const newSubject = this.genericRepository.save({
            department,
            ...subjectDTO,
        });
        return newSubject;
    }
}