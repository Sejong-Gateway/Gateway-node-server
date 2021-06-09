import { Service, Inject } from 'typedi';
import { BaseService } from './BaseService';
import {Category} from "../models/Category";

export interface IcategoryDTO {
    title: string;
    description: string;
}

@Service()
export default class CollageService extends BaseService<Category> {
    constructor(){
        super(Category);
    }

    async create(categoryDTO: Partial<IcategoryDTO>): Promise<Category> {
        const newCategory = this.genericRepository.save(categoryDTO);
        return newCategory;
    }
}