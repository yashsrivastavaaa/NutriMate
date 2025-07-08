import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as recipeHomeSchema from './recipeHomeSchema';
const dbApi = process.env.EXPO_PUBLIC_DB_API!;
if (!dbApi) {
    throw new Error('DB_API environment variable is not set');
}
const sql = neon(dbApi);
export const recipeHome = drizzle(sql, { schema: recipeHomeSchema });

