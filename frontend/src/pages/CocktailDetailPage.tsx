import { useParams } from "react-router-dom";
import { Cocktail } from "../model/Cocktail";
import { useEffect, useState } from "react";
import { fetchCocktailById } from "../services/api/cocktailAPI";
import { IngredientListComp } from "../components/CocktailDetailComponents/IngredientsListComp";

import './CocktailDetailPage.css';
import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar";


export const CocktailDetailPage = () => {

    const { cocktailId } = useParams();

    const [cocktail, setCocktail] = useState<Cocktail | null>(null);

    useEffect(() => {
        const fetchCocktail = async (id: string) => {
            try {
                const cocktail = await fetchCocktailById(id);
                setCocktail(cocktail[0]);
            }
            catch (error) {
                console.error("Failed to fetch cocktail:", error);
            }
        }
        if (cocktailId) {
            fetchCocktail(cocktailId);
        }
    }, []);

    return (
        <>
            <CustomAppBar />
            <div className="cocktail-detail-container">
                <div className="cocktail-image-and-name">
                    <h1>{cocktail?.strDrink}</h1>
                    <img src={cocktail?.strDrinkThumb} alt={cocktail?.strDrink + ' logo'} />
                    <p className="cocktail-instructions">{cocktail?.strInstructions}</p>
                </div>

                <div className="ingredients-list">
                    <IngredientListComp ingredients={cocktail?.IngredientList ?? []} />
                </div>
            </div>
        </>
    )
}