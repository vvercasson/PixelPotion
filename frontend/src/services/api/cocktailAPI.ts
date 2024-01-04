import { Cocktail } from '../../model/Cocktail';
import { Ingredient } from '../../model/Ingredient';

const API_URL = 'http://localhost:3001/api/cocktails/';

interface ApiCocktailResponse {
    drinks: Cocktail[];
}

const mapIngredient = (drink: any): Ingredient[] => {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 15; i++) {
        const ingredientName = drink[`strIngredient${i}`];
        const ingredientMeasure = drink[`strMeasure${i}`];

        if (ingredientName && ingredientMeasure) {
            ingredients.push({
                strIngredient: ingredientName,
                strMeasure: ingredientMeasure
            });
        }
    }

    return ingredients;
}


const mapCocktail = (data: ApiCocktailResponse) => {
    const relevantData = data.drinks.map(drink => ({
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strDrinkThumb: drink.strDrinkThumb,
        strInstructions: drink.strInstructions,
        IngredientList: mapIngredient(drink),
        strAlcoholic: drink.strAlcoholic
    }));

    return relevantData;
}

// fetch X random cocktails
export const fetchRandomCocktails = async (num: number) => {
    const RANDOM_API_URL = API_URL + `random/`;

    const cocktailsList: Cocktail[] = [];

    for (let i = 0; i < num; i++) {
        const response = await fetch(RANDOM_API_URL);
        if (!response.ok) throw new Error('Error fetching random cocktails');

        const data: ApiCocktailResponse = await response.json();

        if (data && data.drinks && data.drinks.length > 0) {
            const relevantData = mapCocktail(data);
            cocktailsList.push(...relevantData);
        }
    }

    return cocktailsList;
}

// fetch cocktail by name
export const fetchCocktailByName = async (name: string) => {
    const NAME_API_URL = API_URL + `search/name/${name}`;

    const response = await fetch(NAME_API_URL);
    if (!response.ok) throw new Error('Error fetching cocktail by name');

    const data: ApiCocktailResponse = await response.json();

    if (data && data.drinks && data.drinks.length > 0) {
        const relevantData = mapCocktail(data);
        return relevantData;
    }
    return [];
}

// fetch cocktail by id
export const fetchCocktailById = async (id: string) => {
    const ID_API_URL = API_URL + `search/${id}`;

    const response = await fetch(ID_API_URL);
    if (!response.ok) throw new Error('Error fetching cocktail by id');

    const data: ApiCocktailResponse = await response.json();

    if (data && data.drinks && data.drinks.length > 0) {
        const relevantData = mapCocktail(data);
        return relevantData;
    }
    return [];
}