import {Request, Response, Router} from 'express';
import {Container} from "typedi";
import CollageService from "../../services/CollageService";
import UserService from "../../services/UserService";
import CategoryService from "../../services/CategoryService";
import RequirementService from "../../services/RequirementService";

const route = Router();

export default(app: Router) =>{
    app.use('/category', route);

    route.get('/', async(req: Request, res: Response)=>{
        const categoryServiceInstance = Container.get(CategoryService);
        const list = await categoryServiceInstance.list(['requirements']);

        return res.json(
            list
        );
    });

    route.post('/', async(req: Request, res: Response)=>{
        const categoryServiceInstance = Container.get(CategoryService);
        const newCategory = await categoryServiceInstance.create(req.body);

        return res.json({
            category: newCategory
        });
    });

    route.delete('/:uuid', async(req: Request, res: Response)=>{
        const categoryServiceInstance = Container.get(CategoryService);
        const deleteResult = await categoryServiceInstance.hardDelete(req.params.uuid);

        return res.json(deleteResult);
    });


}