
import React, { useState } from 'react';
import upload from "../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append('product', image);

    try {
      const response = await fetch("https://boho-fashion-e-commerce.onrender.com/upload", {
        method: 'POST',
        headers: {
          Accept: "application/json"
        },
        body: formData,
      });

      const responseData = await response.json();
      if (responseData.success) {
        const product = { ...productDetails, image: responseData.image_url };
        const addProductResponse = await fetch('https://boho-fashion-e-commerce.onrender.com/addproduct', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product),
        });
        const addProductData = await addProductResponse.json();
        addProductData.success ? alert("Product Added") : alert("Failed to add product");
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Error adding product");
    }
  };

  return (
    <div className='lg:px-20 lg:py-10 py-8 px-10 max-w-xl mx-auto lg:mx-0 '>
      <div className='py-3'>
        <p className='text-xl py-1'>Product title</p>
        <input 
          type='text' 
          name='name' 
          placeholder='Type Here' 
          className='lg:w-96 py-1 px-2 border-2 rounded-lg outline-0 w-52' 
          value={productDetails.name} 
          onChange={changeHandler}
        />
      </div>

      <div className='py-3'>
        <p className='text-xl py-1'>Price</p>
        <input 
          type='text' 
          name='price' 
          placeholder='Type Here' 
          className='lg:w-96 py-1 px-2 border-2 rounded-lg' 
          value={productDetails.price} 
          onChange={changeHandler}
        />
      </div>

      <p className='text-xl py-1'>Product Category</p>
      <div className='py-2'>
        <select 
          name="category" 
          className='border-2 py-1 px-1 rounded-lg' 
          value={productDetails.category} 
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="Kid">Kid</option>
        </select>
      </div>

      <div className='py-2'>
        <label htmlFor='file-input'>
          <img 
            src={image ? URL.createObjectURL(image) : upload} 
            className='cursor-pointer max-w-sm h-52 w-44'
            alt="Upload Area"
          />
        </label>
        <input 
          type='file' 
          name='image' 
          id='file-input' 
          hidden 
          onChange={imageHandler}
        />
      </div>

      <button 
        className='py-2 text-white px-5 rounded-lg mt-2' 
        style={{ backgroundColor: '#a00220' }} 
        onClick={addProduct}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
