import * as express from 'express';
import { Firestore } from '@google-cloud/firestore';

export class Publish {
    public express: express.Application;
    private db: Firestore;

    constructor(db: Firestore) {
        this.db = db;
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();
        
        router.post('/', (req, res) => {
            this.validateData(req.body, res);
            
            const newEntry = {};
            newEntry[req.body.type] = {
                value: req.body.value, 
                date: new Date()
            }

            this.db.collection('rooms').doc(req.body.roomId).set({
                recentReadings: newEntry
            }, {
                merge: true
            }).then(doc => {
                res.status(200).send(doc);
            }).catch(e => {
                res.status(400).send(e);
            })
        });

        this.express.use('/', router);
    }

    private validateData(data, res): void {
        if (data.roomId === undefined)
            res.status(400).end('Property roomId is needed');
        if (data.type === undefined)
            res.status(400).end('Property type is needed');
        if (data.value === undefined || isNaN(data.value))
            res.status(400).end('Property value can not be ' + data.value);
    }
}

// export default new Publish().express;