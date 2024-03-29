import { Router, Request, Response } from 'express';
import UserService from '../../services/UserService';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
    app.use('/user', route);

    route.get('/', async(req: Request, res: Response)=>{
        const userServiceInstance = Container.get(UserService);
        const list = await userServiceInstance.list(
            ['currentSubjects', 'completeSubjects', 'remainSubjects', 'categories'
            ]
        );

        return res.json({
            users: list
        })
    });

    route.delete('/:uuid', async(req: Request, res: Response) => {
        const userServiceInstance = Container.get(UserService);
        const deleteResult = await userServiceInstance.hardDelete(req.params.uuid);

        return res.json(deleteResult);
    });
    
    // route.post('/', async(req: Request, res: Response)=>{
    //     const userServiceInstance = Container.get(UserService);
    //     const newUser = await userServiceInstance.create(req.body);
    //
    //     return res.json({
    //         user: newUser
    //     })
    // });
}