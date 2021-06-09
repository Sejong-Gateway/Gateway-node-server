import { Service, Inject } from 'typedi';
import { getConnection } from 'typeorm';
import { BaseService } from './BaseService';
import {Collage} from "../models/College";

export interface IcollageDTO {
    name: string;
}

@Service()
export default class CollageService extends BaseService<Collage> {
    constructor(){
        super(Collage);
    }

    async create(collageDTO: Partial<IcollageDTO>): Promise<Collage> {
        const newCollage = this.genericRepository.save(collageDTO);
        return newCollage;
    }
}