import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import { Link ,useNavigate} from 'react-router-dom';


const ProductDisplay = (props) => {
    const {product} = props;
    const {addTocart } =useContext(ShopContext)
    const navigate = useNavigate();

    const handleAddToCart = () => {
      const isLoggedIn = localStorage.getItem('auth-token');
  
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        addTocart(product.id);
      }
    };
  
  
  return (
    <div className='flex mx-auto max-w-6xl gap-12 flex-wrap mb-20'>
<div className='mx-auto lg:mx-0'>
    <img src={product.image} alt="img" className='lg:w-72 w-60'></img>
</div>
<div className='lg:mt-5 mx-auto lg:mx-0 mx-5'>
 <h3 className='text-lg text-gray-400'>Boho Fashion</h3>   
<h1 className='text-3xl font-semibold my-3'>{product.name}</h1>
<div className='text-lg py-2'> Rs. {product.price}</div>
<div>
  

    <button className='border-2 px-4 py-2  lg:my-5 hover:bg-red-100 hover:border-black mt-3 ' style={{border:'1px solid #a00220', color:'#a00220'}}
   
    onClick={handleAddToCart}
    > ADD TO CART</button>
    <Link to={'/cart'}> <button className='border-2 px-4 py-2 text-white lg:my-5 my-2 hover:border-0' style={{backgroundColor:'#a00220'}}
   
    onClick={handleAddToCart}
    
    > BUY IT NOW</button></Link>
   <div className='my-3'>

    <div className='text-lg'><strong>Category : </strong>{product.category}</div>
    <div className='text-lg'><strong>Tags : </strong>Modern,Latest</div>
   </div>
</div>
</div>
      
    </div>
  )
}

export default ProductDisplay
