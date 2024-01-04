import { Cocktail } from "../../model/Cocktail";
import './CocktailThumbnail.css';

import { useNavigate } from "react-router-dom";



interface CocktailThumbnailProps {
    cocktail: Cocktail;
}



export const CocktailThumbnail: React.FC<CocktailThumbnailProps> = ({ cocktail }: CocktailThumbnailProps) => {

    const navigate = useNavigate();

    const navigateToCocktailDetail = (cocktailId: string) => {
        navigate(`/cocktail/${cocktailId}`);
    }

    const isAlcoholic = (): boolean => {
        if (cocktail.strAlcoholic === "Alcoholic") {
            return true
        } else {
            return false
        }
    }

    return (
        <div className={`cocktail-container ${isAlcoholic() ? 'alcoholic' : 'virgin'}`} onClick={() => { navigateToCocktailDetail(cocktail.idDrink) }}>
            <img className="cocktail_thumnnail" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p className="cocktail_text">{cocktail.strDrink}</p>
        </div>
    )
};