import * as express from 'express';
import * as v1 from './v1';

class Routes {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes(): void {
        const router = express.Router();

        router.use('/v1', v1.default);

        this.express.use('/', router);
    }
}

export default new Routes().express;