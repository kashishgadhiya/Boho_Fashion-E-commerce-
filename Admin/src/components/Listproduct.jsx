

import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const Listproduct = () => {
  const [allproduct, setAllproduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchInfo = async () => {
    setLoading(false); 
    await fetch('https://boho-fashion-e-commerce.onrender.com/allproduct')
      .then((res) => res.json())
      .then((data) => {
        setAllproduct(data);
        setTotalCount(data.length); 
      })
      .finally(() => setLoading(false)); 
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    setLoading(true); 
    await fetch("https://boho-fashion-e-commerce.onrender.com/removeproduct", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo(); 
  };

  return (
    <div className='py-10 px-2 '>
      <h1 className='text-2xl font-semibold text-center mx-auto'>All Products List</h1>
      <div className='flex lg:justify-end px-2 my-2 justify-center '>
        <p className='text-md font-semibold'>Total Products: {totalCount}</p>
      </div>
      
      {loading ? (
       <Loading/>
      ) : (
        <div className='flex flex-wrap gap-3  h-12 mt-5 '>
          {allproduct.map((product, index) => (
            <div key={index} className=''>
              <img src={product.image} className='h-24 w-24' alt={product.name} />
              <p className='text-md'>{product.name}</p>
              <p>Rs.{product.price}</p>
              <p>{product.category}</p>
              <button
                className='text-white rounded-lg px-1 py-1 text-sm'
                style={{ backgroundColor: '#a00220' }}
                onClick={() => {
                  removeProduct(product.id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
      )}
    </div>
  );
};

export default Listproduct;
