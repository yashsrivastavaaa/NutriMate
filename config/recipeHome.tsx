import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as recipeHomeSchema from './recipeHomeSchema';
const sql = neon('postgresql://neondb_owner:npg_YBsS3Qntwi9H@ep-falling-wind-a4eeczgh-pooler.us-east-1.aws.neon.tech/NutriMate?sslmode=require');
export const recipeHome = drizzle(sql, { schema: recipeHomeSchema });

