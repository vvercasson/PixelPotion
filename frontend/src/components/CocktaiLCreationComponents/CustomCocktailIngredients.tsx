import { useState } from "react"
import { Ingredient } from "../../model/Ingredient"
import { IngredientAdd } from "./IngredientAdd"
import { IngredientListComp } from "../CocktailDetailComponents/IngredientsListComp"

interface CustomCocktailIngredientsProps {
    onIngredientsChange: (ing: Ingredient[]) => void
}

export const CustomCocktailIngredients: React.FC<CustomCocktailIngredientsProps> = ({ onIngredientsChange }) => {

    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    function handleCreationAddIngredient(ingredient: Ingredient): void {
        const newIngredients = [...ingredients, ingredient]
        setIngredients(newIngredients)
        onIngredientsChange(newIngredients)

    }

    function handleDelete(ingredient: Ingredient): void {
        const newIngredients = ingredients.filter((ing) => (!ing.strIngredient.match(ingredient.strIngredient)) || (!ing.strMeasure.match(ingredient.strMeasure)))
        setIngredients(newIngredients)
        onIngredientsChange(newIngredients)
    }

    return (
        <>
            <div className="ingredients-container">
                <IngredientAdd onAdd={handleCreationAddIngredient} />
                <IngredientListComp ingredients={ingredients} editable={true} handleDelete={handleDelete} />
            </div>
        </>
    )
}