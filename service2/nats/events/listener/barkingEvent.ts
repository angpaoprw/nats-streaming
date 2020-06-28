import { Subject, Listener } from '../../../common'
import { Message } from 'node-nats-streaming'

interface BarkingEvent {
    subject: Subject.barking
    data: any
}
export class BarkingListener extends Listener<BarkingEvent> {
    subject: Subject.barking = Subject.barking;
    groupName = 'barking';

    async onMessage(data: BarkingEvent['data'], msg: Message) {


        console.log(data);


        msg.ack();
    }


}