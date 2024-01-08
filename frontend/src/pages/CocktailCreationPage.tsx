import React from 'react'
import './CocktailCreationPage.css'
import { CustomAppBar } from '../components/AppBarComponents/CustomAppBar'

export const CocktailCreationPage: React.FC = () => {

    return (
        <>
            <CustomAppBar />
            <div className="creation-container">
                <h1 className="title">Custom Cocktail Creation Page</h1>
            </div>
        </>
    )
}