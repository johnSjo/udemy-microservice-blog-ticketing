import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { getSignupCookie } from '../../test/setup';

it('returns a 404 if provided id does not exist', async () => {
  const title = 'The Globe';
  const price = 25.5;
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', getSignupCookie())
    .send({ title, price })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const title = 'The Globe';
  const price = 25.5;
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title, price })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const title = 'The Globe';
  const price = 25.5;
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', getSignupCookie())
    .send({ title, price });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', getSignupCookie())
    .send({ title: 'New Globe', price: 100 })
    .expect(401);
});

it('returns a 400 if the user provided an invalid title or price', async () => {
  const title = 'The Globe';
  const price = 25.5;
  const cookie = getSignupCookie();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title, price });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: '', price: 100 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'New Globe', price: -100 })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const title = 'The Globe';
  const price = 25.5;
  const cookie = getSignupCookie();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title, price });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'New Globe', price: 100 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('New Globe');
  expect(ticketResponse.body.price).toEqual(100);
});
