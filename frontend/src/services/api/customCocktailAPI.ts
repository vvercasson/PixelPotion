import { CustomCocktail } from "../../model/CustomCocktail";
import { Ingredient } from "../../model/Ingredient";

const API_URL = 'http://localhost:3001/api/custom-cocktails/';

export const fetchCustomCocktails = async (name: string): Promise<CustomCocktail[]> => {
    const response = await fetch(API_URL + `search/name/${name}`);
    if (response.status === 404) return [];
    if (!response.ok) throw new Error('Error fetching custom cocktails');

    const data = await response.json();

    if (data && data.customCocktails && data.customCocktails.length > 0) {
        return data.customCocktails;
    } else {
        return [];
    }
};

const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

export const postCustomCocktail = async (userId: number, name: string, ingredients: Ingredient[], instructions: string, image: File): Promise<CustomCocktail | null> => {

    // Convert image to base64
    const base64Image = await getBase64(image);

    const payload = {
        userId,
        name,
        ingredients: JSON.stringify(ingredients),
        instructions,
        image: base64Image
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Error creating custom cocktail');

    const data = await response.json();

    if (data) {
        console.log('Custom cocktail created successfully');
        return data.customCocktail;
    } else {
        console.log('Custom cocktail creation unsuccessful');
        return null;
    }
}