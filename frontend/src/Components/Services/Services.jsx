
import React, { useEffect, useRef } from 'react';
import { FaTruck, FaUnlockAlt } from 'react-icons/fa';
import { RiMoneyRupeeCircleFill } from 'react-icons/ri';
import "./Services.css"

const Services = () => {
  const truckRef = useRef(null);
  const unlockRef = useRef(null);
  const rupeeRef = useRef(null);

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

    if (truckRef.current) observer.observe(truckRef.current);
    if (unlockRef.current) observer.observe(unlockRef.current);
    if (rupeeRef.current) observer.observe(rupeeRef.current);

    return () => {
      if (truckRef.current) observer.unobserve(truckRef.current);
      if (unlockRef.current) observer.unobserve(unlockRef.current);
      if (rupeeRef.current) observer.unobserve(rupeeRef.current);
    };
  }, []);

  return (
    <div className='flex lg:justify-between my-10 mt-10 flex-wrap items-center justify-center gap-5'>
      <div
        ref={truckRef}
        className='service-item animate-left flex items-center justify-center flex-col'
        style={{ color: '#a00220' }}
      >
        <FaTruck
          style={{
            fontSize: '5rem',
            color: 'rgb(185 28 28)',
            border: '5px solid rgb(185 28 28)',
            borderRadius: '50%',
            padding: '10px',
          }}
        />
        <p className='text-xl font-semibold mx-auto'>Quality & Safe shipping</p>
      </div>
      <div
        ref={unlockRef}
        className='service-item animate-top flex items-center justify-center flex-col'
        style={{ color: '#a00220' }}
      >
        <FaUnlockAlt
          style={{
            fontSize: '5rem',
            color: 'rgb(185 28 28)',
            border: '5px solid rgb(185 28 28)',
            borderRadius: '50%',
            padding: '10px',
          }}
        />
        <p className='text-xl font-semibold mx-auto'>Secure Payments</p>
      </div>
      <div
        ref={rupeeRef}
        className='service-item animate-right flex items-center justify-center flex-col'
        style={{ color: '#a00220' }}
      >
        <RiMoneyRupeeCircleFill
          style={{
            fontSize: '5rem',
            color: 'rgb(185 28 28)',
            border: '5px solid rgb(185 28 28)',
            borderRadius: '50%',
            padding: '10px',
          }}
        />
        <p className='text-xl font-semibold mx-auto'>Best price guarantee</p>
      </div>
    </div>
  );
};

export default Services;
