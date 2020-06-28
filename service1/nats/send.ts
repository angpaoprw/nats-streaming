import { Publish, Subject } from '../common/index'
import { Stan } from 'node-nats-streaming'

interface BarkingEvent {
    subject: Subject.barking
    data: string
}

export class Send extends Publish<BarkingEvent> {

    subject: Subject.barking = Subject.barking

}