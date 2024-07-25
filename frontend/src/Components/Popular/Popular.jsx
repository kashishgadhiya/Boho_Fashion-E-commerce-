

import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import Cardloading from '../Cardloading/Cardloading';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Popular = () => {
  const [loading, setLoading] = useState(true); 
  const [popular, setPopular] = useState([]);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          centerMode: true, 
          centerPadding: '0', 
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true, 
          centerPadding: '20px', 
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true, 
          centerPadding: '20px', 
        },
      },
    ],
  };

  useEffect(() => {
    fetch('https://e-commerce-website-h0yp.onrender.com/popularinwomen')
      .then((res) => res.json())
      .then((data) => {
        setPopular(data); 
        setLoading(false); 
      })
  }, []);
  
  console.log(popular);
  
  return (
    <div className='py-6 mx-auto'>
      <h1 className='lg:text-3xl font-semibold py-2 text-center text-2xl mx-auto'>#BOHOGIRLS</h1>
      <hr className='lg:w-52 h-2 rounded-full text-center mx-auto w-44' style={{ backgroundColor: '#a00220' }} />
      {/* <div className='grid lg:grid-cols-4 mx-auto grid-cols-2 md:grid-cols-3 lg:gap-4 sm:grid-col-1 my-5'> */}
      <div className=''>
        {loading ? (
            <div className='grid lg:grid-cols-4 mx-auto grid-cols-2 md:grid-cols-3 lg:gap-4 sm:grid-col-1 my-5'> 
          <Cardloading/>
          </div>
        ) : (
          <div className="slider-container">
          <Slider {...settings}>
            {popular.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
            ))}
          </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popular;


