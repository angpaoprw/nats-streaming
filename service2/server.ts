import express from 'express'
import { natsWrapper } from './nats/natConnection'
import { BarkingListener } from './nats/events/listener/barkingEvent'

const app = express();

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

        new BarkingListener(natsWrapper.client).listen();

    } catch (err) {
        console.error(err);
    }
}

startNats();



app.listen(5001, (err) => {
    if (err) {
        console.log('failed to connect to server');
    }

    console.log('connect to server 5001');

})