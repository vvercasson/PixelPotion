import React from 'react'
import './CocktailCreationPage.css'
import { CustomAppBar } from '../components/AppBarComponents/CustomAppBar'
import { ImageInput } from '../components/CocktaiLCreationComponents/ImageInput'
import { CustomInstructions } from '../components/CocktaiLCreationComponents/CustomInstructions'
import { CustomCocktailIngredients } from '../components/CocktaiLCreationComponents/CustomCocktailIngredients'
import { Ingredient } from '../model/Ingredient'

export const CocktailCreationPage: React.FC = () => {

    const [cocktailName, setCocktailName] = React.useState<string>('')
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [instructions, setInstructions] = React.useState<string>('')
    const [image, setImage] = React.useState<File>()

    function checkValidFields() {
        if (cocktailName === '') {
            alert('This potion needs a name !')
            return
        }
        if (ingredients.length === 0) {
            alert('This potion needs ingredients !')
            return
        }
        if (instructions === '') {
            alert('This potion needs instructions !')
            return
        }
        if (!image) {
            alert('This potion needs an image !')
            return
        }
        console.log(instructions)
        alert('Potion created !')
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setCocktailName(e.target.value)
    }

    function handlePublish(): void {
        checkValidFields()
    }

    // CALLBACKs

    function imageCallback(img: File) {
        setImage(img)
    }

    function instructionsCallback(instr: string) {
        setInstructions(instr)
    }

    function ingredientsCallback(ing: Ingredient[]) {
        setIngredients(ing)
    }


    return (
        <>
            <CustomAppBar />
            <div className="creation-container">
                <h3 className="title">Create your own Potion</h3>
                <div className="create-div">
                    <input type="text" name="cocktail-name" id="cocktail-name-input" className="cocktail-name-input" onChange={handleNameChange} />
                    <ImageInput onImageChange={imageCallback} />
                    <CustomInstructions onInstructionsChange={instructionsCallback} />
                    <CustomCocktailIngredients onIngredientsChange={ingredientsCallback} />
                    <button type="button" onClick={handlePublish}>Publish</button>
                </div>
            </div>
        </>
    )
}