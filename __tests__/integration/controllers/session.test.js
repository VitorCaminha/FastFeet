import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factories';

describe('Session', () => {
  it('should be able to login with email and password', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@fastfeet.com',
        password: '123456',
      });

    expect(res.body).toHaveProperty('token');
  });

  it('should not be able to login with wrong email', async () => {
    const user = await factory.attrs('User', { password: 123456 });

    const res = await request(app)
      .post('/sessions')
      .send(user);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('This email is not registered');
  });

  it('should not be able to login with wrong password', async () => {
    const user = await factory.attrs('User', { email: 'admin@fastfeet.com' });

    const res = await request(app)
      .post('/sessions')
      .send(user);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Password does not match');
  });

  it('should not be able to login with no password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@fastfeet.com',
        password: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
  });

  it('should not be able to login with no email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: '',
        password: 123456,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation fails');
  });
});
