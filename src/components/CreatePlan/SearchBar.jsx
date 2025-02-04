import React, { useState } from "react";

const SearchBar = ({ searchQuery, onSearch }) => {
    
    const [query, setQuery] = useState(searchQuery);

    const handleInputChange =  (e) => setQuery(e.target.value);
    
    // 검색어 전달
    const handleSearchClick = () => onSearch(query);
    

    return (
        <div className="search-bar border-2 ">
            <input type="text" 
            value={query}
            onChange={handleInputChange}
            placeholder="검색어를 입력해 주세요."
            />
            <button onClick={handleSearchClick}
            className="search-button "
            >검색</button>
        </div>
    );
};
export default SearchBar;