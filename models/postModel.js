import { sql } from '../database.js';

export const index = async () => (
  await sql.query('SELECT * FROM posts')).rows;

export const findById = async (id) => (
  await sql.query('SELECT * FROM posts WHERE "id" = $1', [id])).rows[0];

export const create = async ({ title, body }) => (
  await sql.query('INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING "id"', [title, body])).rows[0];

export const update = async (id, { title, body }) => (
  await sql.query(`
  UPDATE posts SET
  "title" = COALESCE($2, title),
  "body" = COALESCE($3, body),
  "updatedAt" = now()
  WHERE "id" = $1
  RETURNING "id"`,
  [id, title, body])).rows[0];

export const remove = async (id) => (
  await sql.query('DELETE FROM posts WHERE "id" = $1 RETURNING "id"', [id])).rows[0];
