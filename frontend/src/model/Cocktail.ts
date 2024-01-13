import { Ingredient } from "./Ingredient";

export interface Cocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
    IngredientList: Ingredient[];
    strAlcoholic: string;
}

export const emptyCocktail = {
    idDrink: '',
    strDrink: '',
    strDrinkThumb: '',
    strInstructions: '',
    IngredientList: [],
    strAlcoholic: ''
} as Cocktail;