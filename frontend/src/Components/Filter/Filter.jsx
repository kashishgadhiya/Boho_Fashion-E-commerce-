
import React, { useState } from 'react';

const Filter = ({ products, setProducts }) => {
  const [sortType, setSortType] = useState('lowest');

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortProducts(e.target.value);
  };

  const sortProducts = (type) => {
    const sortedProducts = [...products];
    switch (type) {
      case 'lowest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'highest':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'a-z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  return (
    <div className="my-10 border px-2 py-2">
      <form>
        <label htmlFor="sort">Sort by : </label>
        <select name="sort" id="sort" onChange={handleSortChange} value={sortType} className='border-none outline-none'>
        
          <option value="lowest">Price (lowest)</option>
          <option value="highest">Price (highest)</option>
          <option value="a-z">Name (A-Z)</option>
          <option value="z-a">Name (Z-A)</option>
        </select>
      </form>
    </div>
  );
};

export default Filter;
