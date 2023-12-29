import React from "react"
import { CustomAppBar } from "../components/AppBarComponents/CustomAppBar"
import { SearchBar } from "../components/SearchPageComponents/SearchBar"

export const SearchPage : React.FC = () => {
    return (
        <div className="search-main-container">
            <CustomAppBar/>
            <h1> Search Page </h1>
            <SearchBar/>
        </div>
    )
}