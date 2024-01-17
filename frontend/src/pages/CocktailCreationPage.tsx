import React, { useContext, useState } from 'react'
import './CocktailCreationPage.css'
import { CustomAppBar } from '../components/AppBarComponents/CustomAppBar'
import { ImageInput } from '../components/CocktaiLCreationComponents/ImageInput'
import { CustomInstructions } from '../components/CocktaiLCreationComponents/CustomInstructions'
import { CustomCocktailIngredients } from '../components/CocktaiLCreationComponents/CustomCocktailIngredients'
import { Ingredient } from '../model/Ingredient'
import { AuthContext } from '../context/AuthContext'
import { postCustomCocktail } from '../services/api/customCocktailAPI'
import { useNavigate } from 'react-router-dom'

export const CocktailCreationPage: React.FC = () => {

    // get user id from context
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()


    const [cocktailName, setCocktailName] = useState<string>('')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [instructions, setInstructions] = useState<string>('')
    const [image, setImage] = useState<File>()

    function checkValidFields() {
        if (cocktailName === '') {
            alert('This potion needs a name !')
            return
        }
        if (!image) {
            alert('This potion needs an image !')
            return
        }
        if (instructions === '') {
            alert('This potion needs instructions !')
            return
        }
        if (ingredients.length === 0) {
            alert('This potion needs ingredients !')
            return
        }
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setCocktailName(e.target.value)
    }

    function handlePublish(): void {
        checkValidFields()
        if (user && user.id && image) {
            console.log('publishing cocktail');
            postCustomCocktail(user.id, cocktailName, ingredients, instructions, image);
            alert('Your potion has been published !')
            navigate('/')
        }
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
                    <input type="text" name="cocktail-name" id="cocktail-name-input" className="cocktail-name-input" placeholder='Enter Potion Name' onChange={handleNameChange} />
                    <ImageInput onImageChange={imageCallback} />
                    <CustomInstructions onInstructionsChange={instructionsCallback} />
                    <CustomCocktailIngredients onIngredientsChange={ingredientsCallback} />
                    <button type="button" className='publish-btn' onClick={handlePublish}>Publish</button>
                </div>
            </div>
        </>
    )
}