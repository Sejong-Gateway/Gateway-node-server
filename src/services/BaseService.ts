import { getConnection, Repository } from "typeorm";
import { BaseModel } from "../models/BaseModel";
export type ObjectType<T> = { new (): T } | Function;

export abstract class BaseService<T extends BaseModel>{
    protected genericRepository: Repository<T>;
    private repo: ObjectType<T>;
    
    constructor(repo: ObjectType<T>) {
        this.genericRepository = getConnection().getRepository(repo);
        this.repo = repo;
    }

    async list(relations?: string[]){
        const list = this.genericRepository.find({
            relations,
        }) as Promise<T[]>;

        return list;
    }
}