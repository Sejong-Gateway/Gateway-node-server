import {DeleteResult, getConnection, Repository} from "typeorm";
import {BaseModel} from "../models/BaseModel";

export type ObjectType<T> = { new(): T } | Function;

export abstract class BaseService<T extends BaseModel> {
    protected genericRepository: Repository<T>;
    private repo: ObjectType<T>;

    constructor(repo: ObjectType<T>) {
        this.genericRepository = getConnection().getRepository(repo);
        this.repo = repo;
    }

    async list(relations?: string[]) {
        const list = this.genericRepository.find({
            relations
        }) as Promise<T[]>;

        return list;
    }

    async getByUUID(uuid: string, relations?: string[]): Promise<T> {
        return this.genericRepository.findOne({
            where: {uuid},
            relations,
        }) as Promise<T>;
    }

    async softDelete(uuid: string): Promise<T> {
        const oldOne = await (this.getByUUID(uuid) as Promise<T>);
        const newOne: Partial<T> = {};
        newOne.deletedAt = new Date();
        return this.genericRepository.save({...oldOne, ...newOne} as object);
    }

    async hardDelete(uuid: string): Promise<DeleteResult> {
        return getConnection()
            .createQueryBuilder()
            .delete()
            .from(this.repo)
            .where('uuid = :uuid', {uuid})
            .execute();
    }

    async getByUUIDs(uuids: string[], relations?: string[]) {
        const list = this.genericRepository.findByIds(uuids, {
            relations,
        }) as Promise<T[]>;

        return list;
    }
}