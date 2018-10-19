import * as express from 'express';
// import { users } from './users';
import { Rooms } from './rooms';
import { Publish } from './publish';

export class V1 {
    public express: express.Application;
    private db;

    constructor(db) {
        this.db = db;
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();

        // router.use('/users', users.default);
        router.use('/rooms', new Rooms(this.db).express);
        router.use('/publish', new Publish(this.db).express);

        this.express.use('/', router);
    }
}