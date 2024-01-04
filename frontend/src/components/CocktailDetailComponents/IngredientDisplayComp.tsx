import { Ingredient } from "../../model/Ingredient";

import './Ingredient.css';

interface IngredientDisplayCompProps {
    ingredient: Ingredient;
}

export const IngredientDisplayComp: React.FC<IngredientDisplayCompProps> = ({ ingredient }) => {
    return (
        <>
            <div className="ingredient-item">
                <p>Name : {ingredient.strIngredient}</p>
                <p>Quantity : {ingredient.strMeasure}</p>
            </div>
        </>
    )
}