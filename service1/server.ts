import express from 'express'
import { natsWrapper } from './nats/natsConnect'
import { Send } from './nats/send'
import { json, urlencoded } from 'body-parser'
import './database/dbh'

const app = express();

app.use(json())
app.use(urlencoded({ extended: true }))

const startNats = async () => {

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID || 'test',
            process.env.NATS_CLIENT_ID || 'test',
            process.env.NATS_URL || 'localhost:4222'
        );
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

    } catch (err) {
        console.error(err);
    }
}

startNats();

app.post('/send', (req, res) => {
    if (!req.body.data) {
        return res.status(400).json({ error: 'No Body' })
    }

    new Send(natsWrapper.client).publish(req.body.data);

    res.json('dones')
})


app.listen(5000, (err) => {
    if (err) {
        console.log('failed to connect to server');
    }
    console.log('connect to server 5000');

})