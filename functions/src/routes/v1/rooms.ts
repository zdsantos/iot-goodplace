import * as express from 'express';

export class Rooms {
    public express: express.Application;
    private db;

    constructor(db) {
        this.db = db;
        this.express = express();
        this.routes();
    }

    private routes() : void {
        const router = express.Router();

        router.get('/:id', (req, res) => {
            this.db.collection('rooms').doc(req.params.id).get().then(doc => {
                res.status(200).send(doc.data());
            }).catch(e => {
                res.status(400).send(e);
            })
        });

        router.post('/', (req, res) => {
            if (this.validateData(req.body, res)) {   

                this.db.collection('rooms').add(req.body).then(doc => {
                    this.db.collection('rooms').doc(doc.id).set({
                        id: doc.id
                    }, { merge: true }).then( _ => {
                        res.status(200).send({ message: `Room ${doc.id} created!`, id: doc.id });
                    }).catch(e => {
                        res.status(400).send(e);
                    });
                }).catch(e => {
                    res.status(400).send(e);
                });

            }
        });

        router.put('/:id', (req, res) => {
            this.db.collection('rooms').doc(req.params.id).update(req.body).then( _ => {
                res.status(200).send({ message: `Room ${req.params.id} updated!` });
            }).catch(e => {
                res.status(400).send(e);
            })
        });

        router.delete('/:id', (req, res) => {
            this.db.collection('rooms').doc(req.params.id).delete().then( _ => {
                res.status(200).send({ message: `Room ${req.params.id} deleted!` });
            }).catch(e => {
                res.status(400).send(e);
            })
        })

        this.express.use('/', router);
    }

    private validateData(data, res): boolean {
        let error = null;
        if (data.name === undefined)
            error = { property: 'name', value: data.name };
        if (data.address === undefined)
            error = { property: 'address', value: data.address };
        if (data.attributes === undefined)
            data['attributes'] = [];
        if (data.reference === undefined)
            data['reference'] = '';
        if (data.description === undefined)
            data['description'] = '';
        
        if (error !== null)
            res.status(400).end(`Property ${ error.property } cannot be ${ error.value }`);

        return error === null;
    }

}