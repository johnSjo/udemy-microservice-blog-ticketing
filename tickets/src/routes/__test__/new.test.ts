import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';
import { getSignupCookie } from '../../test/setup';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.statusCode).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a status code other than 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({});

  expect(response.statusCode).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({ title: '', price: 10 })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({ price: 10 })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({ title: 'The Globe', price: -10 })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({ title: 'The Globe' })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  const tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', getSignupCookie())
    .send({ title: 'The Globe', price: 25.5 })
    .expect(201);

  const ticketsPostRequest = await Ticket.find({});
  const [ticket] = ticketsPostRequest;

  expect(ticket.id).toBeDefined();
  expect(ticketsPostRequest.length).toEqual(1);
});
