import React, { useEffect, useState } from 'react';
import Cardloading from '../Cardloading/Cardloading';
import Item from '../Item/Item';


const NewCollection = () => {
  const [new_collection,setNew_collection] = useState([])
  const [loading, setLoading] = useState(true); 
  useEffect(()=>{
    fetch('https://e-commerce-website-h0yp.onrender.com/newcollection')
 
    .then((res)=>res.json())
    .then((data)=>{setNew_collection(data)
    setLoading(false); 
    
})},[])
  return (
    <div className='py-8  ' id='newcollection'>
        
        <h1 className='lg:text-3xl font-semibold py-2 text-center text-xl'>NEW COLLECTIONS</h1>
        <hr className='lg:w-52 h-2 rounded-full text-center mx-auto w-44' style={{backgroundColor:'#a00220'}}/>
        <div className='grid lg:grid-cols-4 mx-auto grid-cols-2 md:grid-cols-3 lg:gap-4 sm:grid-col-1 my-2 '> 
        {loading?(
      <>

          <Cardloading/>
          <Cardloading/>

        </>
      
        ):
           ( new_collection .map((item,i)=>{ 
              return <Item key={i} id={item.id} name ={item.name} image={item.image} price={item.price}/>
              
            }))
          }
        </div>

      
    </div>
  )
}

export default NewCollection
