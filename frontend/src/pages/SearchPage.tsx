import React, { useEffect, useState } from "react"
import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar"
import { SearchBar } from "../components/SearchPageComponents/SearchBar"
import { Cocktail } from "../model/Cocktail";
import { fetchCocktailByIngredient, fetchCocktailByName } from "../services/api/cocktailAPI";
import { CocktailThumbnail } from "../components/CocktailComponents/CocktailThumbnail";
import { searchTypeInputs, SearchTypeInput } from "../model/SearchTypeInput";
import './SearchPage.css';


export const SearchPage: React.FC = () => {

    const [notFoundText, setNotFoundText] = useState<string>("");

    const [cocktailSearched, setCocktailSearched] = useState<Cocktail[]>([]);


    const [inputSelected, setInputSelected] = useState<SearchTypeInput>(searchTypeInputs[0]);

    const handleSearchSubmit = async (cocktailName: string) => {
        if (inputSelected.searchType === "Cocktail Name") {
            await searchCocktailByName(cocktailName);
        } else if (inputSelected.searchType === "Ingredient Name") {
            await searchCocktailByIngredient(cocktailName);
            console.log("Searching by ingredient")
        }
        else {
            console.error("Non");
        }
    }

    const searchCocktailByName = async (cocktailName: string) => {
        try {
            const searchedCocktails = await fetchCocktailByName(cocktailName);
            setNotFoundText(`No cocktails found for ${cocktailName}`);
            setCocktailSearched(searchedCocktails);
        } catch (error) {
            console.error("Failed to fetch cocktails:", error);
        }
    }

    const searchCocktailByIngredient = async (ingredient: string) => {
        try {
            const searchedCocktails = await fetchCocktailByIngredient(ingredient);
            setNotFoundText(`No cocktails containing \'${ingredient}\' was found`);
            setCocktailSearched(searchedCocktails);
        } catch (error) {
            console.error("Failed to fetch cocktails:", error);
        }
    }

    return (
        <>
            <CustomAppBar />
            <div className="search-main-container">
                <h1 className="title-text"> Find your Potion </h1>
                <div className="select-radio-btn">
                    {searchTypeInputs.map((type, index) => {
                        return (
                            <div className='select-inputs' key={index}>
                                <input type="radio" id={type.searchType} name="search-type" value={type.searchType} checked={inputSelected?.id === type.id} onClick={() => { setInputSelected(type) }} />
                                <label htmlFor={type.searchType}>{type.searchType}</label>
                            </div>
                        )
                    })}
                </div>
                <SearchBar onSearchSubmit={handleSearchSubmit} />
                <div className="cocktails-list">
                    {cocktailSearched.length === 0 && <h2 className="searched-name">{notFoundText} </h2>}
                    {cocktailSearched.map((cocktail, index) => (
                        <CocktailThumbnail cocktail={cocktail} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}