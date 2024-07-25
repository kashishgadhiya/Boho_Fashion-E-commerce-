import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

const ProductPage = (props) => {
    const {product} = props;
  return (
    <div className=' flex items-center  justify-center my-10 font-semibold text-lg ' style={{color:'#a00220'}}>
    Home<MdKeyboardArrowRight />{product.category}<MdKeyboardArrowRight />{product.name}
      
    </div>
  )
}

export default ProductPage
