import { Ingredient } from "./Ingredient";

export interface CustomCocktail {
    id: string;
    userId: number;
    name: string;
    ingredients: Ingredient[];
    instructions: string;
    image: string;
}

export function createCustomCocktail(id: string, userId: number, name: string, ingredients: Ingredient[], instructions: string, image: string): CustomCocktail {
    return {
        id,
        userId,
        name,
        ingredients,
        instructions,
        image
    }
}