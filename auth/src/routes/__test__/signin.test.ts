import request from 'supertest';
import { app } from '../../app';

beforeEach(async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 201 on a successful signin', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@testcom',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'pa',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app).post('/api/users/signin').send({}).expect(400);
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com' })
    .expect(400);
  await request(app)
    .post('/api/users/signin')
    .send({ password: 'password' })
    .expect(400);
});

it('sets a cookie after successful signin', async () => {
  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
