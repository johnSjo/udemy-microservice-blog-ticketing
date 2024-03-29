import { Message } from 'node-nats-streaming';
import { Listener } from './BaseListener';
import { Subjects } from './Subjects';
import { TicketCreatedEvent } from './TicketCreatedEvent';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TICKET_CREATED;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
