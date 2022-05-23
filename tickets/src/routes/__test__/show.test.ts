import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { getSignupCookie } from '../../test/setup';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if it is found', async () => {
  const title = 'The Globe';
  const price = 25.5;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
