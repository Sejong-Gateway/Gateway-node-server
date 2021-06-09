import {Request, Response, Router} from 'express';
import {Container} from "typedi";
import CollageService from "../../services/CollageService";
import UserService from "../../services/UserService";

const route = Router();

export default(app: Router) =>{
    app.use('/auth', route);

    route.post('/signup', async(req: Request, res: Response)=>{
        const userServiceInstance = Container.get(UserService);
        const {user, token} = await userServiceInstance.signUp(req.body);

        return res.json({
            user: user,
            token: token
        });
    });


}