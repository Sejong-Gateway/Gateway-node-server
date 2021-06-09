import {Request, Response, Router} from 'express';
import {Container} from "typedi";
import CollageService from "../../services/CollageService";
import UserService from "../../services/UserService";
import CategoryService from "../../services/CategoryService";
import RequirementService from "../../services/RequirementService";

const route = Router();

export default(app: Router) =>{
    app.use('/requirement', route);

    route.get('/', async(req: Request, res: Response)=>{
        const requirementServiceInstance = Container.get(RequirementService);
        const list = await requirementServiceInstance.list([]);

        return res.json(
            list
        );
    });

    route.post('/', async(req: Request, res: Response)=>{
        const requirementServiceInstance = Container.get(RequirementService);
        const newRequirement = await requirementServiceInstance.create(req.body);

        return res.json({
            requirement: newRequirement
        });
    });


    route.delete('/:uuid', async(req: Request, res: Response)=>{
        const requirementServiceInstance = Container.get(RequirementService);
        const deleteResult = await requirementServiceInstance.hardDelete(req.params.uuid);

        return res.json(deleteResult);
    });

}