import { Ingredient } from "../../model/Ingredient";

import './Ingredient.css';

interface IngredientDisplayCompProps {
    number: number;
    ingredient: Ingredient;
    editable: boolean;
    onDelete: (ingredient: Ingredient) => void;
}


export const IngredientDisplayComp: React.FC<IngredientDisplayCompProps> = ({ number, ingredient, editable, onDelete }) => {
    const handleDelete = () => {
        onDelete(ingredient)
    }

    return (
        <>
            <div className="ingredient-item">
                <div className="ingredient-number">
                    <p>{number}</p>
                    {editable && <button className="ingredient-delete-button" onClick={handleDelete}>X</button>}
                </div>
                <div className="ingredient-info">
                    <p>{ingredient.strIngredient}</p>
                    <p>{ingredient.strMeasure}</p>
                </div>
            </div>
        </>
    )
}