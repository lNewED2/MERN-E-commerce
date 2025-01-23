import React from "react";
import ProductItem from "../../components/Productitem";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#d82626] to 100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center">
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around mt-16 gap-4">
            <ProductItem
              image="./images/home/gamepad.png"
              name="Game pad"
              rating="4"
              price="49.99$"
            />
            <ProductItem
            image="./images/home/headphone.png"
            name="headphone"
            rating="5"
            price="19.99$"
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-4xl font-bold md:leading-snug">
            Discover Uniq{" "}
            <span className="text-red-500">Software Engineering Swag</span> for
            Every Coding Enthusiat
          </h2>
          <p className="text-1 text-[#4A4A4A]">
            Our Mission: To merge fashion with functionality in the world of
            Software Engineering
          </p>
          <button
            className="btn bg-red px-8 py-3 font-semibold text-white rounded-full"
            href="/shop"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;