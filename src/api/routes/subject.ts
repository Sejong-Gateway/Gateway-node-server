import { Router, Request, Response } from 'express';
import UserService from '../../services/CollageService';
import { Container } from 'typedi';
import CollageService from "../../services/CollageService";
import DepartmentService from "../../services/DepartmentService";
import SubjectService from "../../services/SubjectService";

const route = Router();

export default (app: Router) => {
    app.use('/subject', route);

    route.get('/', async(req: Request, res: Response)=>{
        const subjectServiceInstance = Container.get(SubjectService);
        const list = await subjectServiceInstance.list([]);

        return res.json(
            list
        );
    });

    route.post('/', async(req: Request, res: Response)=>{
        const subjectServiceInstance = Container.get(SubjectService);
        const newSubject = await subjectServiceInstance.create(req.body);

        return res.json(newSubject);
    });

    route.delete('/:uuid', async(req: Request, res: Response)=>{
        const subjectServiceInstance = Container.get(SubjectService);
        const deleteResult = await subjectServiceInstance.hardDelete(req.params.uuid);

        return res.json(deleteResult);
    });
}