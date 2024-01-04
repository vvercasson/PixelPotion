import { Ingredient } from "../../model/Ingredient";
import { IngredientDisplayComp } from "./IngredientDisplayComp";

import './Ingredient.css';

interface IngredientListCompProps {
    ingredients: Ingredient[];
}

export const IngredientListComp: React.FC<IngredientListCompProps> = ({ ingredients }) => {
    return (
        <>
            <div className="ingredient-list-container">
                {ingredients.map((ingredient, index) => {
                    return <IngredientDisplayComp key={index} ingredient={ingredient} />
                })}
            </div>
        </>
    )
}