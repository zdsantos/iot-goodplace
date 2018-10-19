import * as express from 'express';
import * as users from './users';
import * as rooms from './rooms';
import * as publish from './publish';

class V1 {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();

        router.use('/users', users.default);
        router.use('/rooms', rooms.default);
        router.use('/publish', publish.default);

        this.express.use('/', router);
    }
}

export default new V1().express;