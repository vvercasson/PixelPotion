import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CustomCocktail } from "../model/CustomCocktail";
import { fetchCustomCocktailsByUserId } from "../services/api/customCocktailAPI";

import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar";
import { CocktailThumbnail } from "../components/CocktailComponents/CocktailThumbnail";
import { emptyCocktail } from "../model/Cocktail";

export const UsersCocktails: React.FC = () => {

    const user = useContext(AuthContext).user;
    const [usersCocktails, setUsersCocktails] = useState<CustomCocktail[]>([]);

    useEffect(() => {
        (async () => {
            if (user) {
                setUsersCocktails(await fetchCustomCocktailsByUserId(user.id));
            }
        })();
    }, [user]);

    useEffect(() => {
        usersCocktails.forEach((cocktail) => {
            console.log(cocktail);
        });

    }, [usersCocktails]);

    return (
        <>
            <CustomAppBar />
            <h1 className="title">Your cocktails</h1>
            <div className="cocktails-list">
                {usersCocktails.map((customCocktail, index) => (
                    <CocktailThumbnail key={index} customCocktail={customCocktail} cocktail={emptyCocktail} />
                ))}
            </div>
        </>
    )
};