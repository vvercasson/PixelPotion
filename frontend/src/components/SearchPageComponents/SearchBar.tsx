import React, { useState } from "react";
import './SearchBar.css';

interface SearchBarProps {
    onSearchSubmit: (cocktailName: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit }) => {

    const [searchText, setSearchText] = useState<string>('');

    const handleInputChange = (cocktailName: string) => {
        setSearchText(cocktailName);
    }

    const handleSearchSubmit = async () => {
        onSearchSubmit(searchText);
    }

    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Enter Cocktail name" className="search-bar" onChange={(e) => {
                handleInputChange(e.target.value);
            }} />
            <button className="search-button" onClick={handleSearchSubmit}>Search</button>
        </div>
    )
};