import request from 'supertest';
import Server from '../server';

let ServerInstance;

describe('Room Controller', () => {
  beforeAll(() => {
    ServerInstance = Server.listen();
  });

  afterAll(() => {
    ServerInstance.close();
  });

  describe('Get', () => {
    it('should return the data sent', async () => {
      const id = 'ROOM_ID';
      const { body } = await request(ServerInstance)
        .get(`/rooms/${id}`)
        .set('Accept', 'application/json')
        .expect(200);

      expect(body).toHaveProperty('id');
      expect(body.id).toBe(id);
    });
  });
});
