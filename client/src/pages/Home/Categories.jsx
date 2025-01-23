import React from "react";
import { useState } from "react";

const categoryItem = [
  {
    id: 1,
    title: "Clothing",
    number: 86,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 2,
    title: "Accessories",
    number: 12,
    image: "/images/home/category/img2.jpg",
  },
  {
    id: 3,
    title: "Gadgets",
    number: 48,
    image: "/images/home/category/img3.jpg",
  },
  {
    id: 4,
    title: "Swag",
    number: 255,
    image: "/images/home/category/img4.jpg",
  },
];

const Category = () => {
  const [category, SetCategory] = useState(categoryItem);

  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">
          Customer Favorites
          <h2 className="title">Popular Categories</h2>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-around items-center mt-12">
        {categoryItem.length > 0 &&
          categoryItem.map((item) => {
            return (
              <div
                key={item.id}
                className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:translate-y-4 transition-all duration-300"
              >
                <div className="w-full mx-auto flex items-center justify-center">
                  <img
                    src={item.image}
                    alt=""
                    className="w-28 h-28 rounded-full bg-red p-2"
                  />
                </div>
                <div className="mt-5 space-y-1">
                  <h5 className="[#1E1E1E] font-semibold">{item.title}</h5>
                  <p className="text-gray-500 text-sm">{item.number} items</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Category;