import React from 'react'

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#cfd234] to-100%">
      <div className="py-24 flex flex-col justify-center items-center">
        <div className="text-center space-y-7 px-4">
          <h2 className="md:text-4xl font-bold md:leading-snug">
            Unleash Your Inner <span className="text-red-500">Geek:</span> Shop
            Our Exclusive Tech-themed Merchandise!
          </h2>
          <p className="text-1 text-[#0e0d0d]">
            We offer a curated selection of high-quality products ranging from
            clothing and accessories to home decor and office essentials. Each
            item is carefully chosen to meet our standards of quality,
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner