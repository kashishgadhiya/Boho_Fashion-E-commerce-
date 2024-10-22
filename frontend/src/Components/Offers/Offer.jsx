

import React, { useEffect, useRef } from 'react';
import { GoArrowRight } from "react-icons/go";
import o_1 from "../Assets/hero_3.png";
import { Link } from 'react-router-dom';


const Offer = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const scrollToNewCollection = () => {
    const newCollectionSection = document.getElementById('newcollection');
    if (newCollectionSection) {
      newCollectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-orange-100 w-max lg:bg-white lg:w-full'>
      <div 
        ref={sectionRef}
        className='flex flex-wrap bg-orange-100 lg:mx-auto lg:w-10/12 lg:rounded-full w-screen lg:m-5 lg:flex-nowrap carousel-animate'
        style={{color:'#a00220'}}
      >
        <div className='lg:py-14 lg:pl-20 pl-10 py-10 p-5 lg:p-0 w-full'>
          <h3 className='text-5xl font-bold py-3'>Exclusive</h3>
          <h3 className='text-4xl font-bold pt-3'>Offers For You</h3>
          <p className='text-xl font-medium py-4'>ONLY ON BEST SELLERS PRODUCTS</p>
          <Link to='#' onClick={scrollToNewCollection}>
            <button className='rounded-full px-3 py-2 flex justify-center text-white item-center gap-3 herobtn font-semibold' style={{border:'1px solid #a00220',backgroundColor:"#a00220"}} >
              Check now<GoArrowRight className='h-6 w-5 hover:w-6' />
            </button>
          </Link>
        </div>
        <img 
          ref={imageRef}
          src={o_1}
          alt='offerimg'
          height={300}
          className='lg:inline hidden carousel-animate'
        />
      </div>
    </div>
  );
}

export default Offer;
