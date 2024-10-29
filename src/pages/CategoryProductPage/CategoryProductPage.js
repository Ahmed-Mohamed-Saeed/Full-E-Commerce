import React, { useEffect, useState } from "react";
import "./CategoryProductPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getAllProductsByCategory, fetchAsyncProductsOfCategory, getCategoryProductsStatus} from "../../store/categorySlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);

  useEffect(() => {
    const normalizedCategory = category.replace("-", " ").toLowerCase();

    const categoryWords = normalizedCategory.split(" ");

    const filtered = categoryProducts.filter(
      (product) =>
        product.title &&
        categoryWords.some((word) => product.title.toLowerCase().includes(word))
    );
    setFilteredProducts(filtered);
  }, [categoryProducts, category]);

  return (
    <div className="cat-products py-5 bg-whitesmoke">
      <div className="container">
        <div className="cat-products-content">
          <div className="title-md">
            <h3>
              See our{" "}
              <span className="text-capitalize">
                {category.replace("-", " ")}
              </span>
            </h3>
          </div>

          {categoryProductsStatus === STATUS.LOADING ? (
            <Loader />
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;
