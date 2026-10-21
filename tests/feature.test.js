jest.mock('configcat-node', () => ({
  getClient: jest.fn(),
}));

const configcat = require('configcat-node');
const getValueAsync = jest.fn();
const originalSdkKey = process.env.CONFIGCAT_SDK_KEY;
process.env.CONFIGCAT_SDK_KEY = 'test-sdk-key';
configcat.getClient.mockReturnValue({ getValueAsync });

const request = require('supertest');
const app = require('../app');

afterAll(() => {
  if (originalSdkKey === undefined) {
    delete process.env.CONFIGCAT_SDK_KEY;
  } else {
    process.env.CONFIGCAT_SDK_KEY = originalSdkKey;
  }
});

describe('GET /funcionalidad', () => {
  beforeEach(() => {
    getValueAsync.mockReset();
  });

  it('responde con la funcionalidad antigua cuando el toggle está apagado', async () => {
    getValueAsync.mockResolvedValue(false);

    const response = await request(app).get('/funcionalidad');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Funcionalidad antigua');
    expect(getValueAsync).toHaveBeenCalledWith('nueva-funcionalidad-x', false);
  });

  it('responde con la nueva funcionalidad cuando el toggle está encendido', async () => {
    getValueAsync.mockResolvedValue(true);

    const response = await request(app).get('/funcionalidad');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Nueva funcionalidad');
  });

  it('inicializa ConfigCat con CONFIGCAT_SDK_KEY', () => {
    expect(configcat.getClient).toHaveBeenCalledWith('test-sdk-key');
  });

  it('responde HTTP 503 cuando CONFIGCAT_SDK_KEY no está configurada', async () => {
    const configuredKey = process.env.CONFIGCAT_SDK_KEY;
    delete process.env.CONFIGCAT_SDK_KEY;

    let appWithoutConfigCat;
    jest.isolateModules(() => {
      appWithoutConfigCat = require('../app');
    });

    const response = await request(appWithoutConfigCat).get('/funcionalidad');

    expect(response.statusCode).toBe(503);
    expect(response.text).toBe('CONFIGCAT_SDK_KEY no está configurada');

    if (configuredKey === undefined) {
      delete process.env.CONFIGCAT_SDK_KEY;
    } else {
      process.env.CONFIGCAT_SDK_KEY = configuredKey;
    }
  });
});
