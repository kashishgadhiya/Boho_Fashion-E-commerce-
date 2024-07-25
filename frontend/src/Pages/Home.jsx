import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offer from '../Components/Offers/Offer'
import NewCollection from '../Components/NewCollections/NewCollection'

import About from '../Components/About/About'
import Animalrescue from '../Components/AnimalRescue/Animalrescue'
import Reviewnew from '../Components/Review/Reviewnew'
import Services from '../Components/Services/Services'


const Shop = () => {
  return (
    <>
      <Hero/>
      <div className='max-w-5xl mx-auto'>

      <Popular/>
      <Offer/>
      <NewCollection/>
      <Animalrescue/>
    <About/>


    </div>

    <Reviewnew/>
    <div className='max-w-5xl mx-auto'>
    <Services/>
    </div>
    

            
      
    </>
  )
}

export default Shop
