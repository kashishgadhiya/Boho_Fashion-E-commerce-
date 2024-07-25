
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const scrollToNewCollection = () => {
const newCollectionSection = document.getElementById('newcollection');
if (newCollectionSection) {
  newCollectionSection.scrollIntoView();
}
};
const items = [
    
    <img src= '/m_1.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation' onClick={scrollToNewCollection}></img>,
    <img src= '/m_2.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation'onClick={scrollToNewCollection}></img>,
    <img src= '/m_3.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation'onClick={scrollToNewCollection}></img>,
    <img src= '/m_4.webp' alt="heroimg" className='cursor-pointer w-screen' role='presentation'onClick={scrollToNewCollection}></img>,
    <img src= '/m_5.webp' alt="heroimg" className='cursor-pointer w-screen'onClick={scrollToNewCollection}></img>,
  
];

const Hero = () => (
  <div className=''>

    <AliceCarousel
        
        items={items}
     
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
       infinite
        />
        </div>
);

export default Hero