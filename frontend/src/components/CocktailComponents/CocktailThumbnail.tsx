import { Cocktail } from "../../model/Cocktail";
import { CustomCocktail } from "../../model/CustomCocktail";
import './CocktailThumbnail.css';

import { useNavigate } from "react-router-dom";



interface CocktailThumbnailProps {
    cocktail: Cocktail;
    customCocktail?: CustomCocktail;
}



export const CocktailThumbnail: React.FC<CocktailThumbnailProps> = ({ cocktail, customCocktail }: CocktailThumbnailProps) => {

    const navigate = useNavigate();

    const navigateToCocktailDetail = (cocktailId: string) => {
        if (!customCocktail) {
            navigate(`/cocktail/${cocktailId}`);
        }
        else {
            alert("Custom cocktails are not supported yet")
        }
    }

    const getCocktailClass = (): string => {
        if (cocktail.strAlcoholic === "Alcoholic") {
            return 'alcoholic'
        } else if (cocktail.strAlcoholic === "Non alcoholic") {
            return 'virgin'
        } else {
            return ''
        }
    }

    if (customCocktail) {
        return (
            <div className={`cocktail-container`} onClick={() => { navigateToCocktailDetail(cocktail.idDrink) }}>
                {<img className="cocktail_thumnnail" src={`${customCocktail.image}`} alt={customCocktail.name} />}
                <p className="cocktail_text">{customCocktail.name}</p>
            </div>
        )
    }
    return (
        <div className={`cocktail-container ${getCocktailClass()}`} onClick={() => { navigateToCocktailDetail(cocktail.idDrink) }}>
            <img className="cocktail_thumnnail" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p className="cocktail_text">{cocktail.strDrink}</p>
        </div>
    )
};