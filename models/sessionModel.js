import { sql } from '../database.js';

export const findById = async (id) => (
  await sql.query('SELECT * FROM sessions WHERE "id" = $1', [id])).rows[0];

export const findByUser = async (id) => (
  await sql.query('SELECT * FROM sessions WHERE "userId" = $1', [id])).rows;

export const create = async ({ userId }) => (
  await sql.query('INSERT INTO sessions("userId") VALUES ($1) RETURNING "id"', [userId])).rows[0];

export const remove = async (id) => (
  await sql.query('DELETE FROM sessions WHERE "id" = $1 RETURNING "id"', [id])).rows[0];
