import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { getSignupCookie } from '../../test/setup';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

interface CreateTicketConfig {
  title: string;
  price: number;
}

function createTicket({ title, price }: CreateTicketConfig) {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({ title, price });
}

it('can fetch a list of tickets', async () => {
  const ticketConfigs = [
    { title: 'The Globe', price: 2.5 },
    { title: 'Ball', price: 12.5 },
    { title: 'Gwe', price: 24.5 },
    { title: 'Pippin', price: 122.5 },
  ];

  await Promise.all(ticketConfigs.map((config) => createTicket(config)));

  const response = await request(app).get(`/api/tickets`).send().expect(200);

  expect(response.body.length).toEqual(ticketConfigs.length);
});
