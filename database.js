import pg from 'pg';

export const sql = (() => {
  const pool = new pg.Pool({
    connectionString: process.env.PG_DATABASE_URL || 'postgresql://localhost',
  });
  return {
    query: (text, params) => {
      if (process.env.NODE_ENV === 'development') { console.log(text); }
      return pool.query(text, params);
    },
    ...pool,
  };
})();
