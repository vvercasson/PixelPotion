import { Ingredient } from "./Ingredient";

export interface CustomCocktail {
    id: number;
    userId: number;
    name: string;
    ingredients: Ingredient[];
    instructions: string;
    image: string;
}

export function createCustomCocktail(id: number, userId: number, name: string, ingredients: Ingredient[], instructions: string, image: string): CustomCocktail {
    return {
        id,
        userId,
        name,
        ingredients,
        instructions,
        image
    }
}