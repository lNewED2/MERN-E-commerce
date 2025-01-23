import React, { useState } from "react";
const Card = ({ item }) => {
  const { id, name, image, description, category, price } = item;
  const [isHeartFiled, setIsHeartFiled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFiled(!isHeartFiled);
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className="rating gap-1 absolute right-2 top-2 p-4 z-10 heartStart"
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="heart"
          className={`mask mask-heart ${isHeartFiled ? "bg-red-400" : " "}`}
        />
      </div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-30"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-action justify-between items-center mt-2">
          <h5 className="text-lg font-bold">
            {price}
            <span className="text-red">฿</span>
          </h5>
          <button className="btn bg-red text-white">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;