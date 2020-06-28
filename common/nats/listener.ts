import { Stan, Message } from 'node-nats-streaming'
import { Subject } from './Subject'

interface Event {
    Subject: Subject
    data: any
}

export abstract class Listener<T extends Event> {
    abstract subject: T['Subject']
    abstract groupName: string
    abstract onMessage(data: any, msg: Message): void
    protected client: Stan
    protected ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.groupName);
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }

    listen() {

        const subscription = this.client.subscribe(
            this.subject,
            this.groupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.groupName}`);

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }




}