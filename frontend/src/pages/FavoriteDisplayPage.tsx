import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar";
import { Cocktail } from "../model/Cocktail";
import { fetchCocktailById } from "../services/api/cocktailAPI";
import { CocktailThumbnail } from "../components/CocktailComponents/CocktailThumbnail";

import './FavoriteDisplayPage.css';
import { FavoriteButton } from "../components/CocktailDetailComponents/FavoriteButtonComp";

export const FavoriteDisplayPage: React.FC = () => {

    const auth = useContext(AuthContext);

    const [cocktailFavorites, setCocktailFavorites] = useState<Cocktail[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadCocktails = async () => {
        if (auth.user) {
            console.log("Favorites to be loaded :", auth.user?.cocktailFavoritesId);
            const favorites = auth.user.cocktailFavoritesId;
            console.log("Favorites loaded :", favorites);
            setIsLoading(true);
            const cocktails = await Promise.all(
                favorites.map(async (favorite) => {
                    const fetchedCocktail = await fetchCocktailById(favorite);
                    return fetchedCocktail[0];
                })
            );
            // setIsLoading(false);
            setCocktailFavorites(cocktails);
            console.log("Cocktail favs loaded :", cocktailFavorites);
        }
    }

    useEffect(() => {
        loadCocktails();
    }, []);


    return (
        <>
            <CustomAppBar />
            <div className="favorites-text">
                <h1 className="shiny-text">
                    Your Favorite Potions
                </h1>
            </div>
            <div className="favorites-container">
                {cocktailFavorites.map((cocktail, index) => {
                    return isLoading ? <div className="loading-text">Loading...</div> :
                        <div className="fav-container" key={index}>
                            <CocktailThumbnail key={index} cocktail={cocktail} />
                            <FavoriteButton cocktailId={cocktail.idDrink} />
                        </div>
                })}
            </div>
        </>
    )
}