import { boolean, integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const recipeHomeSchema = pgTable('recipehome', {
    id: serial('id').primaryKey(),
    recipe_name: text('recipe_name').notNull(),
    description: text('description'),
    ingredients: json('ingredients'),
    steps: json('steps'),
    calories: integer('calories'),
    cook_time: integer('cook_time'),
    prep_time: integer('prep_time'),
    total_time: integer('total_time'),
    image: varchar('image', { length: 100 }),
    is_veg: boolean('is_veg'),
    count: integer('count'),
});
