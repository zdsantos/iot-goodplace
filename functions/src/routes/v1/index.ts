import * as express from 'express';
// import { users } from './users';
// import { rooms } from './rooms';
import { Publish } from './publish';
import { Firestore } from '@google-cloud/firestore';

export class V1 {
    public express: express.Application;
    private db: Firestore;

    constructor(db: Firestore) {
        this.db = db;
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();

        // router.use('/users', users.default);
        // router.use('/rooms', rooms.default);
        router.use('/publish', new Publish(this.db).express);

        this.express.use('/', router);
    }
}