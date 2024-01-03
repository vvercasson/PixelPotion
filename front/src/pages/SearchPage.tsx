import React, { useState } from "react"
import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar"
import { SearchBar } from "../components/SearchPageComponents/SearchBar"
import { Cocktail } from "../model/Cocktail";
import { fetchCocktailByName } from "../services/api/cocktailAPI";
import { CocktailThumbnail } from "../components/CocktailComponents/CocktailThumbnail";
import './SearchPage.css';

export const SearchPage: React.FC = () => {

    const [cocktailSearched, setCocktailSearched] = useState<Cocktail[]>([]);

    const handleSearchSubmit = async (cocktailName: string) => {
        try {
            const searchedCocktails = await fetchCocktailByName(cocktailName);
            setCocktailSearched(searchedCocktails);
        } catch (error) {
            console.error("Failed to fetch cocktails:", error);
        }
    }

    return (
        <>
            <CustomAppBar />
            <div className="search-main-container">
                <h1> Search Page </h1>
                <SearchBar onSearchSubmit={handleSearchSubmit} />
                <div className="cocktails-list">
                    {cocktailSearched.map((cocktail, index) => (
                        <CocktailThumbnail cocktail={cocktail} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}