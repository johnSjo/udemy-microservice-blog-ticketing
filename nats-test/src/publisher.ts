import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/TicketCreatedPublisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '1342terwg',
      title: 'The Globe',
      price: 34,
    });
  } catch (err) {
    console.log(err);
  }

  // const data = JSON.stringify({
  //   id: '1342terwg',
  //   title: 'The Globe',
  //   price: 34,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });
});
