import { useParams } from "react-router-dom";
import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar";
import { IngredientListComp } from "../components/CocktailDetailComponents/IngredientsListComp";
import { useEffect, useState } from "react";
import { fetchCustomCocktailById } from "../services/api/customCocktailAPI";
import { CustomCocktail } from "../model/CustomCocktail";


export const CustomCocktailDetail: React.FC = () => {

    const { cocktailId } = useParams();

    const [cocktail, setCocktail] = useState<CustomCocktail | null>(null);

    const fetchCustomCocktail = async (id: string) => {
        try {
            const cocktail = await fetchCustomCocktailById(id);
            setCocktail(cocktail);
        }
        catch (error) {
            console.error("Failed to fetch cocktail:", error);
        }
    };

    useEffect(() => {
        if (cocktailId) {
            fetchCustomCocktail(cocktailId);
        }
    }, []);

    return (
        <>
            <CustomAppBar />
            <div className="cocktail-detail-container">
                <div className="cocktail-image-and-name">
                    <h1>{cocktail?.name}</h1>
                    <img src={cocktail?.image} alt={cocktail?.name + ' logo'} />
                </div>

                <div className="ingredients-list">
                    <IngredientListComp ingredients={cocktail?.ingredients ?? []} editable={false} />
                    <p className="cocktail-instructions">{cocktail?.instructions}</p>
                </div>
            </div>
        </>
    )
};