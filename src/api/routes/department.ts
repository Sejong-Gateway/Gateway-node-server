import { Router, Request, Response } from 'express';
import UserService from '../../services/CollageService';
import { Container } from 'typedi';
import CollageService from "../../services/CollageService";
import DepartmentService from "../../services/DepartmentService";

const route = Router();

export default (app: Router) => {
    app.use('/department', route);

    route.get('/', async(req: Request, res: Response)=>{
        const departmentServiceInstance = Container.get(DepartmentService);
        const list = await departmentServiceInstance.list(['subjects']);

        return res.json(
            list
        );
    });

    route.post('/', async(req: Request, res: Response)=>{
        const departmentServiceInstance = Container.get(DepartmentService);
        const newDepartment = await departmentServiceInstance.create(req.body);

        return res.json(newDepartment);
    });

    route.delete('/:uuid', async(req: Request, res: Response)=>{
        const departmentServiceInstance = Container.get(DepartmentService);
        const deleteResult = await departmentServiceInstance.hardDelete(req.params.uuid);

        return res.json(deleteResult);
    });
}