import React from "react";

const ProductItem = ({ image, name, price, rate }) => {
  return (
    <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object cover rounded-2xl"
      />
      <div className="space-y-1">
        <h5>{name}</h5>
        <div className="rating">
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-star-2 bg-orange-400"
            disabled
            defaultChecked
          />
        </div>
        <p className="text-red">{price}</p>
      </div>
    </div>
  );
};

export default ProductItem;