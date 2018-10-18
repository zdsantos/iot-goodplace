const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./goodplace-iot.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://goodplace-iot.firebaseio.com'
});

var db = admin.firestore();

var data = {
    name: "Lab Aula",
    description: "Laboratório de aula do GREat",
    reference: "Perto de algum lugar no térrio",
    photoUrl: "https://placehold.it/400",
    address: "Rua dos Bobos, 0, Fortaleza - CE",
    attributes: [
        "wifi", "arcondicionado", "lousa", "mesa para grupo", "mesa individual"
    ],
    recentReadings: [
        { type: "temperature", value: 27, und: "C", date: "2018-11-16 14:20:0000"},
        { type: "luminosity", value: 600, und: "X", date: "2018-11-16 14:20:0000"},
        { type: "noise", value: 15, und: "db", date: "2018-11-16 14:20:0000"}
    ]
};

var docRef = db.collection('rooms').add(data).then(ref => {
    console.log("Added with id: ", ref.id);
    ref.set({
        id: ref.id
    }, { merge: true });
});
