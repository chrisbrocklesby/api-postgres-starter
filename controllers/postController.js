import * as postService from '../services/postService.js';

export const index = async (request, response, next) => {
  try {
    response.json({ data: await postService.index() });
  } catch (error) {
    next(error);
  }
};

export const find = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await postService.find(id);
    if (!data) {
      next();
    }
    response.json({ data });
  } catch (error) {
    next(error);
  }
};

export const create = async (request, response, next) => {
  try {
    const data = await postService.create(request.body);
    response.json({ data });
  } catch (error) {
    next(error);
  }
};

export const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await postService.update(id, request.body);
    if (!data) {
      next();
    }
    response.json({ data });
  } catch (error) {
    next(error);
  }
};

export const remove = async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await postService.remove(id);
    if (!data) {
      next();
    }
    response.json({ data });
  } catch (error) {
    next(error);
  }
};
