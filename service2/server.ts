import express from 'express'

const app = express();



app.listen(5001, (err) => {
    if (err) {
        console.log('failed to connect to server');
    }
    console.log('connect to server');

})