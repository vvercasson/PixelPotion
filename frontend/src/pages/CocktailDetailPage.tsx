import { useParams } from "react-router-dom";
import { Cocktail } from "../model/Cocktail";
import React, { useEffect, useState } from "react";
import { fetchCocktailById } from "../services/api/cocktailAPI";
import { IngredientListComp } from "../components/CocktailDetailComponents/IngredientsListComp";

import './CocktailDetailPage.css';
import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar";
import { FavoriteButton } from "../components/CocktailDetailComponents/FavoriteButtonComp";


export const CocktailDetailPage: React.FC = () => {

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
                    <FavoriteButton cocktailId={cocktail?.idDrink ?? "-1"} />
                </div>

                <div className="ingredients-list">
                    <IngredientListComp ingredients={cocktail?.IngredientList ?? []} />
                    <p className="cocktail-instructions">{cocktail?.strInstructions}</p>
                </div>
            </div>
        </>
    )
}