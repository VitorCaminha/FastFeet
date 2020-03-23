import request from 'supertest';
import faker from 'faker';

import app from '../../../src/app';

describe('Auth', () => {
  it('should not be able to access routes without provide token', async () => {
    const res = await request(app)
      .post('/recipients')
      .set('Authorization', '');

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Token not provided');
  });

  it('should not be able to access routes with invalid token', async () => {
    const token = faker.random.uuid();

    const res = await request(app)
      .post('/recipients')
      .set('Authorization', `bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Token invalid');
  });
});
