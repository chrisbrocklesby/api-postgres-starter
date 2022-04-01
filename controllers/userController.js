import * as userService from '../services/userService.js';

export const register = async (request, response, next) => {
  try {
    response.json({ data: await userService.register(request.body) });
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const { sessionId } = await userService.login(request.body);
    response
      .cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: !!(process.env.NODE_ENV === 'production'),
        maxAge: 2592000000,
        signed: true,
      })
      .json({ data: { sessionId } });
  } catch (error) {
    next(error);
  }
};

export const verify = async (request, response, next) => {
  try {
    const { token } = request.body;
    await userService.verify(token);
    response.json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
};

export const forgot = async (request, response, next) => {
  try {
    const { email } = request.body;
    await userService.forgot(email);
    response.json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (request, response, next) => {
  try {
    const { sessionId } = request.signedCookies;
    await userService.logout(sessionId);
    response.clearCookie('sessionId').json({ data: { success: true } });
  } catch (error) {
    next(error);
  }
};

export const auth = async (request, response, next) => {
  try {
    const sessionId = request.signedCookies.sessionId || request.headers['x-session-id'];
    request.user = await userService.auth(sessionId);
    next();
  } catch (error) {
    next(error);
  }
};
