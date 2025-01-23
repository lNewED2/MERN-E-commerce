import React, { useEffect, useState } from "react";
import productService from "../../service/product.service";
import Card from "../../components/Card";
import { useSearchParams } from "react-router"
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParam, setSearchParam] = useSearchParams("search");
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryQuery = searchParam.get(" category") || "all";
  const itemPerPageQuery = searchParam.get("itemsPerPage") || 4;
  useEffect(() => {
    setSelectedCategory(categoryQuery);
    setItemPerPage(itemPerPageQuery);
  }, [categoryQuery, itemPerPageQuery]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await productService.getAllProducts();
      setProducts(response.data);
      setFilteredItem(response.data);
      setCategory([
        "all",
        ...new Set(response.data.map((item) => item.category)),
      ]);
    };
    fetchData();
  }, []);

  const filterItem = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    setFilteredItem(filtered);
    handleSortChange(setSortOption, filtered);
    setSearchParam({['category']:category})
    setSelectedCategory(category);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItem = [...products];
    switch (option) {
      case "a-z":
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItem.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItem.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedItem.sort((a, b) => b.price - a.price);
        break;
    }
    setFilteredItem(sortedItem);
  };

  //Pagination Logic
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = filteredItem.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="section-container">
      <div className="flex md:flex-row md:justify-between flex-col flex-wrap items-center space-y-3 mb-8">
        {/**Filter */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          {category.map((category, index) => {
            return (
              <button
                key={index}
                className={`${
                  selectedCategory === category ? "active" : ""
                }px-4 py-2 rounded-full`}
                onClick={() => filterItem(category)}
              >
                <p className="capitalize">{category}</p>
              </button>
            );
          })}
        </div>
        {/**Sort Options */}
        <div className="flex justify-end mb-4 rounded-sm">
          <div className="bg-black p-2">
            <select
              name="sortOption"
              id="sortOption"
              className="bg-black text-white px-2 rounded-sm"
              onChange={(e) => handleSortChange(e.target.value, filteredItem)}
            >
              <option value="default">DEFAULT</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="hight-to-low">Hight to Low</option>
            </select>
          </div>
        </div>
        {/** Product List */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItem.length > 0 &&
            currentItem.map((item, index) => {
              return <Card key={index} item={item} />;
            })}
        </div>
        {/**Pagination */}
        <div className="section-container flex flex-row items-center justify-center my-8 flex-wrap gap-2">
          <div className="flex justify-center items-center my-8 flex-wrap gap-2">
            {Array.from({
              length: Math.ceil(filteredItem.length / itemPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4
                        py-2 rounded-full ${
                          currentPage === index
                            ? "bg-red-950 text-white"
                            : "bg-gray"
                        }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;