import {Service, Inject, Container} from 'typedi';
import { BaseService } from './BaseService';
import {Category} from "../models/Category";
import {Requirement} from "../models/Requirement";
import DepartmentService from "./DepartmentService";
import CategoryService from "./CategoryService";

export interface IrequirementDTO {
    name: string;
    count: number;
    unit: string;
    categoryUUID: string;
}

@Service()
export default class CollageService extends BaseService<Requirement> {
    constructor(){
        super(Requirement);
    }

    async create(requirementDTO: Partial<IrequirementDTO>): Promise<Requirement> {
        const categoryService = Container.get(CategoryService);
        const category = await categoryService.getByUUID(requirementDTO.categoryUUID, []);

        const newRequirement = this.genericRepository.save({
            ...requirementDTO,
            category
        });

        return newRequirement;
    }
}