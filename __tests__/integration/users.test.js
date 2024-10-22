import request from 'supertest';
import server from '../../src/server';

const TOKEN = process.env.TOKEN_TEST;
const ID_USER = process.env.ID_USER_TEST;

describe('Users', () => {
  it('should return all users', async () => {
    const response = await request(server)
    .get(`/users`)
    .set('Authorization', TOKEN)

    expect(response.status).toBe(200) 
  }, 20000);

  it('should return status a specific user', async () => {
    const response = await request(server)
    .get(`/users/${ID_USER}`)
    .set('Authorization', TOKEN)

    expect(response.status).toBe(200) 
  }, 20000);
});
