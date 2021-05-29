import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';

import config from '../config';

export default ({ app } : {app: express.Application} ) => {
    app.get('/status', (req: Request, res: Response) => {
        res.status(200).end();
    });
    
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.enable('trust proxy');

    app.use(cors());

    app.use(require('method-override')());

    app.use(express.json());

    app.use(config.api.prefix, routes());

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res
            .status(err.status)
            .send({ message: err.message })
            .end();
        }
        return next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
            message: err.message,
            },
        });
    });
}