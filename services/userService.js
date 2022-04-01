import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as Users from '../models/userModel.js';
import * as Sessions from '../models/sessionModel.js';
import sendEmail from '../commons/email.js';
import userValidator from '../validators/userValidator.js';

export const register = async ({ email, password }) => {
  await userValidator({ email, password }, ['email', 'password']);

  if (await Users.findByEmail(email)) {
    throw Object({
      name: 'badRequest',
      message: 'User email already exists',
    });
  }

  const token = uuidv4();

  const user = await Users.create({
    email,
    password: await bcrypt.hash(password, 10),
    token,
  });

  sendEmail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Verify Email',
    html: `<html><body>
    Your verify token is: ${token}
    </body></html>`,
  });

  return user;
};

export const login = async ({ email, password }) => {
  await userValidator({ email, password }, ['email', 'password']);

  const user = await Users.findByEmail(email);
  if (!user) {
    throw Object({
      name: 'authError',
      message: 'User email doesn`t exist',
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw Object({
      name: 'authError',
      message: 'User password is invalid',
    });
  }

  // if (user && user.token) {
  //   throw Object({
  //     name: 'authError',
  //     message: 'Users email needs verifying',
  //   });
  // }

  const sessions = await Sessions.findByUser(user.id);
  if (sessions.length >= 3) {
    await Sessions.remove(sessions[0].id);
  }

  const sessionId = (await Sessions.create({ userId: user.id })).id.replace(/-/g, '');
  return { sessionId };
};

export const logout = async (sessionId) => {
  await Sessions.remove(sessionId);
};

export const verify = async (token) => {
  await userValidator({ token }, ['token']);

  const user = await Users.findByToken(token);

  if (!user) {
    throw Object({
      name: 'badRequest',
      message: 'No email verify token found',
    });
  }
  await Users.update(user.id, { token: null });
  return { status: 'ok' };
};

export const resetPassword = async (token, password) => {
  await userValidator({ token, password }, ['token', 'password']);

  const user = await Users.findByToken(token);
  if (!user) {
    throw Object({
      name: 'badRequest',
      message: 'No password reset token found',
    });
  }
  await Users.update(user.id, { password: await bcrypt.hash(password, 10) });
  return { status: 'ok' };
};

export const forgot = async (email) => {
  await userValidator({ email }, ['email']);

  const user = await Users.findByEmail(email);
  if (!user) {
    throw Object({
      name: 'badRequest',
      message: 'User email doesn`t exist',
    });
  }

  const token = uuidv4();
  await Users.update(user.id, { token });

  await sendEmail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Reset Password',
    text: `Your password reset token is: ${token}`,
  });

  return { status: 'ok' };
};

export const auth = async (sessionId) => {
  const session = (sessionId) ? await Sessions.findById(sessionId) : null;

  if (!session) {
    throw Object({
      name: 'authError',
      message: 'No valid user session found',
    });
  }
  return { id: session.userId };
};
