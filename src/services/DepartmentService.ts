import {Service, Inject, Container} from 'typedi';
import { getConnection } from 'typeorm';
import { BaseService } from './BaseService';
import {Collage} from "../models/College";
import {Department} from "../models/Department";
import CollageService from "./CollageService";

export interface IdepartmentDTO {
    name: string;
    collageUUID: string;
}

@Service()
export default class DepartmentService extends BaseService<Department> {
    constructor(){
        super(Department);
    }

    async create(departmentDTO: Partial<IdepartmentDTO>): Promise<Department> {
        const collageService = Container.get(CollageService);
        const collage = await collageService.getByUUID(departmentDTO.collageUUID);
        const newDepartment = this.genericRepository.save({
            ...departmentDTO,
            collage
        });
        return newDepartment;
    }
}