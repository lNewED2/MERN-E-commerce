import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productService from "../../service/product.service";

const SampleNextArrow = (props) => {
  const { onClick, className, style } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        background: "red",
        borderRadius: "50%",
      }}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick, className, style } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        background: "green",
        borderRadius: "50%",
      }}
    >
      BACK
    </div>
  );
};

const SpecialProduct = () => {
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await productService.getAllProducts();
      const special = data.filter((item) => item.category === "gadget")
      setProduct(special);
    };
    fetchData();
  }, []);
  
  const slider = useRef(null);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Item</p>
        <h2 className="title">Standout Item from Our Products</h2>
      </div>
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24 space-x-3">
        <button
          className="btn bg-red-700 p-2 rounded-full h-10 w-10 mt-5 text-white "
          onClick={() => {
            slider?.current?.slickPrev();
          }}
        >
          &lt;
        </button>
        <button
          className="btn bg-red-700 p-2 rounded-full h-10 w-10 mt-5 text-white "
          onClick={() => {
            slider?.current?.slickNext();
          }}
        >
          &gt;
        </button>
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-10 space-x-5"
        >
          {Product.length > 0 &&
            Product.map((item, index) => {
              return (
                <div key={index} className="p-4">
                  <div className="product-card bg-white rounded-lg shadow-md p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-600">{item.price}฿</p>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialProduct;