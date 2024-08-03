import Search from '../Components/NavBar/Search/Search';
import React, { useContext, useState, useEffect } from 'react';
import Item from '../Components/Item/Item';
import Loading from '../Components/Loading/Loading'; 
import { ShopContext } from "../Context/ShopContext";

import Filter from '../Components/Filter/Filter'; 
import Cardloading from '../Components/Cardloading/Cardloading';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [loading, setLoading] = useState(true); 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false); 

  useEffect(() => {
    
    setTimeout(() => {
     
      const filteredProducts = all_product.filter(item => item.category === props.category);
      setProducts(filteredProducts);
      setFilteredProducts(filteredProducts); 
      setLoading(false); 
    }, 1000); 

    
    return () => {
      setLoading(true); 
    };
  }, [all_product, props.category]);

 
  
  const handleFilterProducts = (inputValue) => {
    const newData = products.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredProducts(newData); 

   
    if (newData.length === 0) {
      setNoProductsFound(true);
    } else {
      setNoProductsFound(false);
    }
  };

  return (
    <div className=' max-w-6xl mx-auto min-h-screen'>
  
          <div className='my-5 text-center'>
            <h2 className='text-3xl font-semibold'>BOHO <br/>COMMUNITY</h2>
            <p className='my-3 max-w-xl mx-auto'>We would love to see how you combine your Boho garments.
            Share your look and mention us using <strong>@BohoFashion</strong> or with the tag <strong>#bohocommunity</strong></p>
          </div>
          
          <div className='flex items-center lg:justify-between flex-wrap  justify-center '>
        
            <Search handleFilter={handleFilterProducts} />
            <Filter products={filteredProducts} setProducts={setFilteredProducts} />
          </div>


      {loading && 
      <div className='my-56'>
        <Loading/>

      </div>
      
      
      }

    
      {!loading && (
        <>
          
       
         
          {noProductsFound ? (
            <p className="text-center mt-4 text-gray-500">No products found</p>
          ) : (
            <div className="grid lg:grid-cols-4 mx-auto grid-cols-2 md:grid-cols-3 lg:gap-4 sm:grid-col-1 ">
              {filteredProducts.map((item) => (
                <Item key={item.id} id={item.id} name={item.name} image={item.image} price={item.price} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopCategory;
