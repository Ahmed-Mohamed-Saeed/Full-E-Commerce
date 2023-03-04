import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import addToCartHandler from "../../pages/ProductSinglePage/ProductSinglePage";
import "./Product.scss";

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product?.id}`} key={product?.id}>
      <div className="product-item bg-white">
        <div className="category">{product?.category}</div>
        <div className="product-item-img">
          <img
            className="img-cover"
            src={product?.images[0]}
            alt={product.title}
          />
        </div>
        <div className="product-item-info fs-14">
          <div className="brand">
            <span>Brand: </span>
            <span className="fw-7">{product?.brand}</span>
          </div>
          <div className="title py-2">{product?.title}</div>
          <div class="navbar-cart flex align-center">
            <Link class="cart-btn" to={`/cart`} onClick={() => { addToCartHandler(product)}}>
              <i class="fa-solid fa-cart-shopping dark-cart"></i>
            </Link>
          </div>
          <div className="price flex align-center justify-center">
            <span className="old-price">{formatPrice(product?.price)}</span>
            <span className="new-price">
              {formatPrice(product?.discountedPrice)}
            </span>
            <span className="discount fw-6">
              ({product?.discountedPercentage}% Off)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
