import * as express from 'express';

export class Publish {
    public express: express.Application;
    private db;

    constructor(db) {
        this.db = db;
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();
        
        router.post('/', (req, res) => {
            if (this.validateData(req.body, res)) {
                const data = req.body;
                
                // adding date on sensors
                Object.keys(data.sensors).forEach(key => {
                    data.sensors[key]['date'] = new Date();
                });

                this.db.collection('rooms').doc(data.roomId).set(data, {
                    merge: true
                }).then(doc => {
                    res.status(200).send(doc);
                }).catch(e => {
                    res.status(400).send(e);
                })
            }
        });

        this.express.use('/', router);
    }

    private validateData(data, res): boolean {
        if (data.roomId === undefined) {
            res.status(400).end('Property roomId is needed');
            return false;
        }
        if (data.sensors === undefined) {
            res.status(400).end('Property sensors is needed');
            return false;
        }
        
        let ok = true;
        Object.keys(data.sensors).forEach(key => {
            if (data.sensors[key].value === undefined){
                res.status(400).end(`Reading of ${key} must have a value property`);
                ok = false;
            }
        });

        return ok;
    }
}

// export default new Publish().express;