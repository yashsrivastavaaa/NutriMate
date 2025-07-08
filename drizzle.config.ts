import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './drizzle',
    schema: './config/recipeHomeSchema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_YBsS3Qntwi9H@ep-falling-wind-a4eeczgh-pooler.us-east-1.aws.neon.tech/NutriMate?sslmode=require',
    },
});