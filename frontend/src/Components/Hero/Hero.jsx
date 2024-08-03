
import React, { useEffect, useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Hero.css'; 

const scrollToNewCollection = () => {
  const newCollectionSection = document.getElementById('newcollection');
  if (newCollectionSection) {
    newCollectionSection.scrollIntoView();
  }
};

const items = [
  <img src='/m_1.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation' onClick={scrollToNewCollection} />,
  <img src='/m_2.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation' onClick={scrollToNewCollection} />,
  <img src='/m_3.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation' onClick={scrollToNewCollection} />,
  <img src='/m_4.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation' onClick={scrollToNewCollection} />,
  <img src='/m_5.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation' onClick={scrollToNewCollection} />,
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div ref={carouselRef} className={`carousel-animate ${isVisible ? 'in-view' : ''}`}>
        <AliceCarousel
          items={items}
          disableButtonsControls
          autoPlay
          autoPlayInterval={1000}
          infinite
        />
      </div>
    </div>
  );
};

export default Hero;
