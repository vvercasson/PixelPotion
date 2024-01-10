import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addFavorite, removeFavorite } from "../../services/api/usersAPI";

interface FavoriteButtonProps {
    cocktailId: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ cocktailId }) => {

    const user = useContext(AuthContext).user;

    const [userFavorites, setUserFavorites] = useState<string[]>([]);

    useEffect(() => {
        setUserFavorites(user?.cocktailFavoritesId || []);
        console.log(user?.cocktailFavoritesId);
    }, [user?.cocktailFavoritesId]);

    const isFavorite = userFavorites.includes(cocktailId);

    const addToFavorite = () => {
        if (user) {
            if (!user.cocktailFavoritesId.includes(cocktailId)) {
                const updatedFavorites = [...user?.cocktailFavoritesId, cocktailId];
                user.cocktailFavoritesId = updatedFavorites;
                setUserFavorites(updatedFavorites);
                console.log("userId:", user.id);

                addFavorite(user.id, Number(cocktailId));
            }
        }
    };

    const removeFromFavorite = () => {
        if (user) {
            const updatedFavorites = user?.cocktailFavoritesId.filter(id => id !== cocktailId);
            user.cocktailFavoritesId = updatedFavorites;
            setUserFavorites(updatedFavorites);
            removeFavorite(user.id, Number(cocktailId));
        }
    };

    const handleFavorite = () => {
        if (isFavorite) {
            removeFromFavorite();
        } else {
            addToFavorite();
        }
    }


    return (
        <>
            <div className="btn-container">
                <button className="add-to-fav" onClick={handleFavorite}>
                    {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
                </button>
            </div>
        </>
    )
}
