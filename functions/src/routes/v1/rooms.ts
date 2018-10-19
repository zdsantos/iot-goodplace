import * as express from 'express';
import * as functions from 'firebase-functions';

class Rooms {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();

        const db = functions.firestore;

        router.get('/', (req, res) => {
            res.send('Pegoooou rooms');
        });

        this.express.use('/', router);
    }
}

export default new Rooms().express;