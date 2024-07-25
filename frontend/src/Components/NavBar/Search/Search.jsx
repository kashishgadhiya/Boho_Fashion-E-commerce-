


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
    <div className='flex items-center border rounded-full px-2 py-2 w-full lg:w-64 hover:border-red-700'>
      <input
        type="text"
        className="flex-1 rounded-full lg:px-2 bg-transparent outline-none px-1"
        placeholder='Search'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button 
        onClick={handleSearch} 
        className='ml-2 lg:ml-0'
        style={{ minWidth: '2.5rem' }} 
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;

