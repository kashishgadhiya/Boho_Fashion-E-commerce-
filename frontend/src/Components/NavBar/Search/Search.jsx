import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = ({ handleFilter }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    handleFilter(inputValue); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='rounded-full border px-2 py-2 w-64 hover:border-red-700' >
      <input
        type="text"
        className="rounded-full px-2 bg-transparent outline-none"
        placeholder='Search'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleSearch} className='mt-1'>
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
