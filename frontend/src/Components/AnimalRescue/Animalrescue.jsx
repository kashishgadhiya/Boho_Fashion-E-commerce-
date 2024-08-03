import React, { useEffect, useRef, useState } from 'react';
import './Animalrescue.css';
import CountUp from 'react-countup';

const Animalrescue = () => {
  const [isVisible, setIsVisible] = useState(false);
  const countUpRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
       
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, 
      }
    );

    if (countUpRef.current) {
      observer.observe(countUpRef.current);
    }


    return () => {
      if (countUpRef.current) {
        observer.unobserve(countUpRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className='bannerimg py-2 px-3'>
        <h2 className='lg:text-3xl py-2 text-center text-2xl mx-auto mt-5'>Towards Animal Rescue</h2>
        <p className='my-10 text-md text-slate-800'>
          At Boho Fashion, our focus is on improving the lives of animals in need. Every purchase you make goes beyond
          getting a great product – it helps support their well-being. Be part of this impactful journey. Together,
          let's raise awareness and vital funds for these animals, creating a world where love and care for them
          prevails.
        </p>
      </div>
      <div className='mx-auto my-10 flex justify-around lg:flex-row flex-col gap-5'>
        <div className='text-center'>
          <h3 className='text-5xl py-3 mx-auto'>1%</h3>
          <p className='py-2'>of each sale goes to Animal Rescue</p>
        </div>
        <div></div>
        <div className='text-center' ref={countUpRef}>
          {isVisible && (
            <h3 className='text-5xl py-3 mx-auto'>
              <CountUp start={0} end={100} duration={7} separator=' ' decimals={0} suffix='+' />
            </h3>
          )}
          <p className='py-2'>Animal Rescued till now</p>
        </div>
      </div>
    </>
  );
};

export default Animalrescue;