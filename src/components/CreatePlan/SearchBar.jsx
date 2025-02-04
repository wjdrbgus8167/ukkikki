import React, { useState } from "react";

const SearchBar = ({ searchQuery, onSearch }) => {
    
    const [query, setQuery] = useState(searchQuery);

    const handleInputChange =  (e) => setQuery(e.target.value);
    
    // 검색어 전달
    const handleSearchClick = () => onSearch(query);
    

    return (
        <div className="search-bar">
            <input type="text" 
            value={query}
            onChange={handleInputChange}
            placeholder="검색어를 입력해 주세요."
            className="input bg-gray-200 px-4"
            />
            {/* 취소를 할지 검색을 할지 */}
            <button onClick={handleSearchClick}
            className="search-button text-xs px-2"
            >취소</button>
        </div>
    );
};
export default SearchBar;