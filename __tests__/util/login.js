import request from 'supertest';
import app from '../../src/app';

async function login() {
  const response = await request(app)
    .post('/sessions')
    .send({
      email: 'admin@fastfeet.com',
      password: '123456',
    });

  const { token } = response.body;

  return token;
}

export default login;
