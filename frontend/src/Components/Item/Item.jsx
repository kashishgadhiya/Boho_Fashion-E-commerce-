import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='bg-white p-4 rounded-md text-center hover:bg-gray-200 shadow-2xl hover:shadow-black/50 transition-all my-1 mx-1 cursor-pointer'>
      <div className='mx-auto lg:object-cover object-left-top object-fill lg:h-[18rem] lg:w-[12rem] md:w-[9rem] w-[7rem] h-[12rem]'>
        <Link to={`/product/${props.id}`}>
          <img className='h-full w-full object-cover hover:object-scale-down' src={props.image} alt={props.name} />
        </Link>
      </div>
      <div className='p-3'>
        <div>
          <p>{props.name}</p>
          <p>Rs. {props.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
