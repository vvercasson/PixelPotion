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

    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Enter Cocktail name" className="search-bar" onChange={(e) => {
                handleInputChange(e.target.value);
            }}
                onKeyDown={handleEnterKeyPress} />
            <button accessKey='ENTER' className="search-button" onClick={handleSearchSubmit}>Search</button>
        </div>
    )
};