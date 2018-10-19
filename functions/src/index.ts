import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import { Routes } from './routes';

const serviceAccount = require('/home/zdsantos/repositories/.keys/goodplace-iot.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://goodplace-iot.firebaseio.com"
});

const db = admin.firestore();
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({'extended':true}));
app.use(bodyParser.json());

// Routes
app.use(new Routes(db).express);

const api = functions.https.onRequest(app);

export { api };