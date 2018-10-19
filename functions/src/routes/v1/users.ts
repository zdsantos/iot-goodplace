import * as express from 'express';

class Users {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();

        router.get('/', (req, res) => {
            res.send('Pegoooou');
        });

        this.express.use('/', router);
    }
}

export default new Users().express;