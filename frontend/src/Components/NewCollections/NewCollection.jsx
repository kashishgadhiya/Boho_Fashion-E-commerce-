
import React, { useEffect, useState, useRef } from 'react';
import Cardloading from '../Cardloading/Cardloading';
import Item from '../Item/Item';

const NewCollection = () => {
  const [new_collection, setNew_collection] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('https://e-commerce-website-h0yp.onrender.com/newcollection')
      .then((res) => res.json())
      .then((data) => {
        setNew_collection(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  return (
    <div className='py-8' id='newcollection'>
      <h1
        ref={titleRef}
        className='lg:text-3xl font-semibold py-2 text-center text-xl title-animate'>
        NEW COLLECTIONS
      </h1>
      <hr
        className='lg:w-52 h-2 rounded-full text-center mx-auto w-44'
        style={{ backgroundColor: '#a00220' }}
      />
      <div
        ref={gridRef}
        className='grid lg:grid-cols-4 mx-auto grid-cols-2 md:grid-cols-3 lg:gap-4 sm:grid-col-1 my-2 carousel-animate'>
        {loading ? (
          <>
            <Cardloading />
            <Cardloading />
          </>
        ) : (
          new_collection.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NewCollection;
