import React from "react";
import { Ingredient } from "../../model/Ingredient";

import './IngredientAdd.css'

interface IngredientAddProps {
    onAdd: (ingredient: Ingredient) => void
}

export const IngredientAdd: React.FC<IngredientAddProps> = ({ onAdd }) => {

    const [ingredient, setIngredient] = React.useState<Ingredient>({ strIngredient: '', strMeasure: '' })

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.value
        setIngredient({ ...ingredient, strIngredient: name })
    }

    const handleMeasureChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const measure = event.target.value
        setIngredient({ ...ingredient, strMeasure: measure })
    }

    const handleAdd = () => {
        if (ingredient.strIngredient === '' || ingredient.strMeasure === '') {
            alert('Please fill in the fields the best you can !')
            return
        }
        onAdd(ingredient)
    }

    return (
        <>
            <div className="ingredient-adding-container">
                <h3>Add the ingredients of your potion !</h3>
                <div className="ingredient-adding-div">
                    <div className="ingredient-adding-div">
                        <input type="text" className="ingredient-adding-input" placeholder="Name" onChange={handleNameChange} />
                        <input type="text" className="measure-adding-input" placeholder="Quantity or Measurement" onChange={handleMeasureChange} />
                        <button className="ingredient-adding-button" onClick={handleAdd}>Add Ingredient</button>
                    </div>
                </div>
            </div>
        </>
    )
}