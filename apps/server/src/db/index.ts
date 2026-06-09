import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { type Sql } from 'postgres';
import * as schema from './schema';

const createDrizzle = (conn: Sql) => drizzle(conn, { schema });

export const createDb = (url: string) => {
  const conn = postgres(url, {
    max: 1,
    idle_timeout: 5,
    connect_timeout: 10,
  });
  const db = createDrizzle(conn);
  return { db, conn };
};

export type DB = ReturnType<typeof createDrizzle>;
