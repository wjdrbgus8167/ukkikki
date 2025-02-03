import React, { useState } from "react";
import search from '../assets/Search.png'

const SearchBar = ({searchQuery, onSearch}) => {
    
    const [query, setQuery] = useState(searchQuery);

    const handleSearchClick = () => onSearch(query);
    

    return (
        <div className="search-bar">
            <input type="text" 
            value={query}
            placeholder="검색어를 입력해 주세요."
            />
            <button onClick={handleSearchClick}
            style={{backgroundImage: `url(${search})`,}}
            className="search-button "
            ></button>
        </div>
    );
};
export default SearchBar;