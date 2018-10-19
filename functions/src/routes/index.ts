import * as express from 'express';
import { V1 } from './v1';

export class Routes {
    public express: express.Application;
    private db;

    constructor(db) {
        this.express = express();
        this.db = db;
        this.routes();
    }

    private routes(): void {
        const router = express.Router();
        
        router.use('/v1', new V1(this.db).express);

        this.express.use('/', router);
    }
}

// export default Routes;