import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factories';
import login from '../../util/login';

describe('Recipient', () => {
  it('should be able to create', async () => {
    const token = await login();

    const recipient = await factory.attrs('Recipient');

    const res = await request(app)
      .post('/recipients')
      .send(recipient)
      .set('Authorization', `bearer ${token}`);

    expect(res.body).toHaveProperty('id');
  });
});
