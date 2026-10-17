const request = require('supertest');
const app = require('../app');

describe('GET /health', () => {
  it('responde 200 y status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /', () => {
  it('responde 200 en la página principal', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});