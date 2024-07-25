import React, { useState } from 'react'
import upload from "../assets/upload_area.svg"

const AddProduct = () => {
  const [image,setImage] = useState(false)
  const [productdetails,setProductdetails] = useState({
    name : "",
    image : "" ,
    category:"women",
    price: " ",


  })
  const imageHandler = (e)=>{
    setImage(e.target.files[0])

  }
  const  chageHandler = (e) =>{
    setProductdetails({...productdetails,[e.target.name]:e.target.value})
  }
  const  Add_product =  async ()=>{
    console.log(productdetails)
    let responseData;
    let product =  productdetails;
    let formData = new FormData()
    formData.append('product' ,image)
    await fetch ("https://e-commerce-backend-2-bxa8.onrender.com/upload",{
      method:'POST',
      headers:{
        Accept :"application/json"
      },
      body:formData,
    }).then((resp) =>resp.json()).then((data) =>{responseData = data })
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product)
      await fetch('https://e-commerce-backend-2-bxa8.onrender.com/addproduct',{
        method :"POST",
        headers :{
          Accept : 'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product),
      }).then((resp) =>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed ")
      })
    }

  }


  return (
    <div className='lg:px-20 lg:py-10 py-8 px-10 max-w-xl mx-auto lg:mx-0 '>
      <div className='py-3'>

      <p className='text-xl py-1'>Product title</p>
      <input type='text' name='name' placeholder='Type Here' className='lg:w-96 py-1 px-2 border-2 rounded-lg outline-0 w-52' value={productdetails.name }onChange={chageHandler}></input>
      </div>

<div className='py-3'>

      <p className='text-xl py-1'>Price</p>
      <input type='text' name='price' placeholder='Type Here' className='lg:w-96 py-1 px-2 border-2 rounded-lg' value={productdetails.price} onChange={chageHandler}></input>
</div>

       <p className='text-xl py-1'>Product Category</p>
       <div className='py-2'>

       <select name="category" className='border-2 py-1 px-1 rounded-lg' value={productdetails.category} onChange={chageHandler}>
      <option value="women">Women</option>
      <option value="men">Men</option>
      <option value="Kid">Kid</option>

       </select>
       </div>
       <div className='py-2'>

<label htmlFor='file-input' >

       <img src={image? URL.createObjectURL(image):upload} className='cursor-pointer  max-w-sm h-52 w-44'></img>

</label>
<input type='file' name='image' id='file-input' hidden onChange={imageHandler}></input>

       </div>
     <button className='py-2 text-white px-5 rounded-lg mt-2' style={{backgroundColor:'#a00220'}} onClick={()=>{Add_product()}}>Add Product</button>

    </div>
  )
}

export default AddProduct
