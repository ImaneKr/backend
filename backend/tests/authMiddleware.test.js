const { verifyAdmin, verifySecretary, verifyTeacher } = require('../middlewares/verifyToken');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');

describe('Authorization Middleware', () => {
  test('should return 403 if role is not admin', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/protected',
      headers: {
        Authorization: 'Bearer valid-token',
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    // Mock the JWT payload
    const payload = { role: 'secretary' };
    jest.spyOn(jwt, 'verify').mockReturnValue(payload);

    verifyAdmin(request, response, next);

    expect(response.statusCode).toBe(403);
    expect(response._getData()).toEqual({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if role is admin', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/protected',
      headers: {
        Authorization: 'Bearer valid-token',
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    // Mock the JWT payload
    const payload = { role: 'admin' };
    jest.spyOn(jwt, 'verify').mockReturnValue(payload);

    verifyAdmin(request, response, next);

    expect(next).toHaveBeenCalled();
  });
});
