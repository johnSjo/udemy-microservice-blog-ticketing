import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './Subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];

  private _client: Stan;

  constructor(client: Stan) {
    this._client = client;
  }

  publish(data: T['data']) {
    return new Promise<void>((resolve, reject) => {
      this._client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) return reject(err);

        console.log(`Event published to ${this.subject}`);
        resolve();
      });
    });
  }
}
