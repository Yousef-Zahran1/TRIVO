import React from 'react'
import About from './sections/About';
import Contact from './sections/Contact';
import FeaturedProducts from './sections/FeaturedProducts';
import Hero from './sections/Hero';
import Offer from './sections/Offer';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <About />
      <Offer />
      <Contact />
    </>
  )
}

export default Home