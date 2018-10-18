import * as functions from 'firebase-functions';

export const updateRoom = functions.firestore.document('sensors').onCreate(async snapshot => {
    functions.firestore.document('senso')
});