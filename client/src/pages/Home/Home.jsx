import React from 'react'
import Banner from './Banner'
import Category from './Categories'
import Service from './service'
import SpecialProduct from './specialProduct'
import Testimonial from './Testimonials'
const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <SpecialProduct />
      <Testimonial />
      <Service />
    </div>
  );
}

export default Home