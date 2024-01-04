import { Ingredient } from "../../model/Ingredient";

import './Ingredient.css';

interface IngredientDisplayCompProps {
    number: number;
    ingredient: Ingredient;
}

export const IngredientDisplayComp: React.FC<IngredientDisplayCompProps> = ({ number, ingredient }) => {
    return (
        <>
            <div className="ingredient-item">
                <div className="ingredient-number">
                    <p>{number}</p>
                </div>
                <div className="ingredient-info">
                    <p>{ingredient.strIngredient}</p>
                    <p>{ingredient.strMeasure}</p>
                </div>
            </div>
        </>
    )
}