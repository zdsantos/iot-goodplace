import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes';

// const serviceAccount = require(process.env.GOODPLACE_CREDENTIAL);
// const serviceAccount = require('/home/zdsantos/repositories/.keys/goodplace-iot.json');
// admin.initializeApp();

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({'extended':true}));
app.use(bodyParser.json());

// Routes
app.use(Routes);

const api = functions.https.onRequest(app);

export { api };