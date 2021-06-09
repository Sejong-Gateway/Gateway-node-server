import { Router } from 'express';
import user from './routes/user';
import collage from "./routes/collage";
import department from "./routes/department";
import subject from "./routes/subject";
import auth from "./routes/auth";
import category from "./routes/category";
import requirement from "./routes/requirement";

export default () => {
	const app = Router();
	user(app);
	collage(app);
	department(app);
	subject(app);
	auth(app);
	category(app);
	requirement(app);
	
	return app
}