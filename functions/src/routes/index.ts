import * as express from 'express';
import { V1 } from './v1';
import { Firestore } from '@google-cloud/firestore';

export class Routes {
    public express: express.Application;
    private db: Firestore;

    constructor(db: Firestore) {
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