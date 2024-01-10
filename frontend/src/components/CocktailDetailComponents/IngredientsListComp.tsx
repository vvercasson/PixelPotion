import { Ingredient } from "../../model/Ingredient";
import { IngredientDisplayComp } from "./IngredientDisplayComp";

import './Ingredient.css';

interface IngredientListCompProps {
    ingredients: Ingredient[];
    editable: boolean;
    handleDelete?: (ingredient: Ingredient) => void | undefined;
}


export const IngredientListComp: React.FC<IngredientListCompProps> = ({ ingredients, editable, handleDelete }) => {

    return (
        <>
            <div className="ingredient-list-container">
                {ingredients.map((ingredient, index) => {
                    return handleDelete ?
                        <IngredientDisplayComp key={index} ingredient={ingredient} number={index} editable={editable} onDelete={handleDelete} />
                        :
                        <IngredientDisplayComp key={index} ingredient={ingredient} number={index} editable={editable} onDelete={() => { }} />
                })}
            </div>
        </>
    )
}