import { sql } from '../database.js';

export const findById = async (id) => (
  await sql.query('SELECT * FROM users WHERE "id" = $1', [id])).rows[0];

export const findByEmail = async (email) => (
  await sql.query('SELECT * FROM users WHERE "email" = $1', [email])).rows[0];

export const findByToken = async (token) => (
  await sql.query('SELECT * FROM users WHERE "token" = $1', [token])).rows[0];

export const create = async ({ email, password, token }) => (
  await sql.query(`
  INSERT INTO users(email, password, token) VALUES ($1, $2, $3) RETURNING "id"`,
  [email, password, token])).rows[0];

export const update = async (id, { email, password, token }) => (
  await sql.query(`
  UPDATE users SET
  "email" = ${(email === undefined) ? 'COALESCE($2, email)' : '$2'},
  "password" = ${(password === undefined) ? 'COALESCE($3, password)' : '$3'},
  "token" = ${(token === undefined) ? 'COALESCE($4, token)' : '$4'},
  "updatedAt" = now()
  WHERE "id" = $1
  RETURNING "id"`,
  [id, email, password, token])).rows[0];

export const remove = async (id) => (
  await sql.query('DELETE FROM users WHERE "id" = $1 RETURNING "id"', [id])).rows[0];
