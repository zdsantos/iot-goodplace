import * as express from 'express';
import * as admin from 'firebase-admin';

class Publish {
    public express: express.Application;

    constructor() {
        admin.initializeApp();
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();
        const db = admin.firestore();

        router.post('/', (req, res) => {
            
            if (req.body.roomId === undefined)
                res.status(400).end('Property roomId is needed');
            if (req.body.type === undefined)
                res.status(400).end('Property type is needed');
            if (req.body.value === undefined || isNaN(req.body.value))
                res.status(400).end('Property value can not be ' + req.body.value);

            db.collection('readings').add(req.body).then(doc => {
                res.status(200).send(doc.id);
            }).catch(e => {
                res.status(400).send(e);
            })
        });

        this.express.use('/', router);
    }
}

export default new Publish().express;