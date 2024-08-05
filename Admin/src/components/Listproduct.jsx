
import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const Listproduct = () => {
  const [allproduct, setAllproduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchInfo = async () => {
    setLoading(true);
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
    <div className='py-10 px-4 md:px-6 lg:px-8 w-full '>
      <h1 className='text-2xl font-semibold text-center mb-4'>All Products List</h1>
      <div className='flex justify-center md:justify-end px-2 mb-4'>
        <p className='text-md font-semibold'>Total Products: {totalCount}</p>
      </div>
      
      {loading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[80vh]'>
          {allproduct.map((product, index) => (
            <div key={index} className='border border-gray-300 p-4 rounded-lg shadow-md flex flex-col items-center'>
              <img src={product.image} className='h-32 w-32 object-cover mb-2' alt={product.name} />
              <p className='text-md font-medium mb-1'>{product.name.length > 15 ? `${product.name.slice(0, 15)}...` : product.name}</p>
              <p className='text-lg font-semibold mb-1'>Rs.{product.price}</p>
              <p className='text-sm text-gray-600 mb-2'>{product.category}</p>
              <button
                className='bg-[#a00220] text-white rounded-lg px-3 py-1 text-sm'
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
