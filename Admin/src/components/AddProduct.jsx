
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
    <div className='px-4 py-8 max-w-lg mx-auto lg:px-8 lg:py-10 lg:mx-1'>
      <div className='py-3'>
        <p className='text-lg lg:text-xl py-1'>Product Title</p>
        <input 
          type='text' 
          name='name' 
          placeholder='Type Here' 
          className='w-full lg:w-96 py-2 px-3 border-2 rounded-lg outline-0' 
          value={productDetails.name} 
          onChange={changeHandler}
        />
      </div>

      <div className='py-3'>
        <p className='text-lg lg:text-xl py-1'>Price</p>
        <input 
          type='text' 
          name='price' 
          placeholder='Type Here' 
          className='w-full lg:w-96 py-2 px-3 border-2 rounded-lg' 
          value={productDetails.price} 
          onChange={changeHandler}
        />
      </div>

      <p className='text-lg lg:text-xl py-1'>Product Category</p>
      <div className='py-2'>
        <select 
          name="category" 
          className='border-2 py-2 px-3 rounded-lg w-full lg:w-96'
          value={productDetails.category} 
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="Kid">Kid</option>
        </select>
      </div>

      <div className='py-4'>
        <label htmlFor='file-input'>
          <img 
            src={image ? URL.createObjectURL(image) : upload} 
            className='cursor-pointer max-w-full h-52 object-cover rounded-lg'
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
        className='py-2 px-5 rounded-lg mt-2 w-full lg:w-auto text-white' 
        style={{ backgroundColor: '#a00220' }} 
        onClick={addProduct}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;


