import * as postModel from '../models/postModel.js';
import postValidator from '../validators/postValidator.js';

export const index = () => postModel.index();

export const find = async (id) => {
  await postValidator({ id }, ['id']);
  return postModel.findById(id);
};

export const create = async ({ title, body }) => {
  await postValidator({ title, body }, ['title', 'body']);
  return postModel.create({ title, body });
};

export const update = async (id, { title, body }) => {
  await postValidator({ id, title, body }, ['id']);
  return postModel.update(id, { title, body });
};

export const remove = async (id) => {
  await postValidator({ id }, ['id']);
  return postModel.remove(id);
};
