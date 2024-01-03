import { Cocktail } from '../../model/Cocktail';

const API_URL = 'http://localhost:3001/api/cocktails/';

interface ApiCocktailResponse {
    drinks: Cocktail[];
}

// Data to cocktail object
const mapCocktail = (data: ApiCocktailResponse) => {
    const relevantData = data.drinks.map(drink => ({
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strDrinkThumb: drink.strDrinkThumb,
        strInstructions: drink.strInstructions,
        IngredientList : []
    }));

    return relevantData;
}

// fetch X random cocktails
export const fetchRandomCocktails = async (num: number) => {
    const RANDOM_API_URL = API_URL + `random/`;

    const cocktailsList: Cocktail[] = [];

    for (let i = 0; i < num; i++) {
        const response = await fetch(RANDOM_API_URL);
        if(!response.ok) throw new Error('Error fetching random cocktails');

        const data: ApiCocktailResponse = await response.json();

        if(data && data.drinks && data.drinks.length > 0) {
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
    if(!response.ok) throw new Error('Error fetching cocktail by name');

    const data: ApiCocktailResponse = await response.json();

    if(data && data.drinks && data.drinks.length > 0) {
        const relevantData = mapCocktail(data);
        return relevantData;
    }
    return [];
}