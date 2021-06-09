import { Router, Request, Response } from 'express';
import UserService from '../../services/CollageService';
import { Container } from 'typedi';
import CollageService from "../../services/CollageService";

const route = Router();

export default (app: Router) => {
    app.use('/collage', route);

    route.get('/', async(req: Request, res: Response)=>{
        const collageServiceInstance = Container.get(CollageService);
        const list = await collageServiceInstance.list(["departments"]);

        return res.json(
            list
        );
    });

    route.post('/', async(req: Request, res: Response)=>{
        const collageServiceInstance = Container.get(CollageService);
        const newCollage = await collageServiceInstance.create(req.body);

        return res.json(newCollage);
    });

    route.delete('/:uuid', async(req: Request, res: Response)=>{
        const collageServiceInstance = Container.get(CollageService);
        const deleteResult = await collageServiceInstance.hardDelete(req.params.uuid);

        return res.json(deleteResult);
    });
}