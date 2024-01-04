import { Ingredient } from "./Ingredient";

export interface Cocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
    IngredientList: Ingredient[];
    strAlcoholic: string;
}