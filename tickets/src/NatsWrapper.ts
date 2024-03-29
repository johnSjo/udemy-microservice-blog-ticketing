import nats, { Stan } from 'node-nats-streaming';

interface NatsWrapperConnectConfig {
  clusterId: string;
  clientId: string;
  url: string;
}

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connected.');
    }

    return this._client;
  }

  connect({ clusterId, clientId, url }: NatsWrapperConnectConfig) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
