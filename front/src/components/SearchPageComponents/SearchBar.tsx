import React, { useState } from "react";
import './SearchBar.css';

export const SearchBar : React.FC = () => {

    const [searchText, setSearchText] = useState<string>('');

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    }

    const handleSearchSubmit = () => {
        //TODO: Link with backend
        alert('Search for ' + searchText);
    }

    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Search" className="search-bar" value={searchText} onChange={handleInputChange(setSearchText)}/>
            <button className="search-button" onClick={handleSearchSubmit}>Search</button>
        </div>
    )
};