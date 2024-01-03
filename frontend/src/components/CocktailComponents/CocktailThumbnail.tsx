import { Cocktail } from "../../model/Cocktail";
import './CocktailThumbnail.css';

interface CocktailThumbnailProps {
    cocktail: Cocktail;
}

export const CocktailThumbnail: React.FC<CocktailThumbnailProps> = ({cocktail}: CocktailThumbnailProps) => {

    return (
        <div className="cocktail-container">
            <img className="cocktail_thumnnail"src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p className="cocktail_text">{cocktail.strDrink}</p>
            <div className="cocktail_tags">
            </div>
        </div>
    )
};