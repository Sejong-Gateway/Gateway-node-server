import {EntityRepository, Repository} from "typeorm";
import {User} from "../models/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(userInfo){
        const user = this.create(userInfo);
        return this.save(user);
    }
}
