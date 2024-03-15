import React from "react";
import { ProductType } from "../../context/productContext";
// import { REDUCER_ACTION_TYPE } from "../../types"; // Assuming REDUCER_ACTION_TYPE is defined in a separate types file
import {
  CartItemType,
  REDUCER_ACTION,
  REDUCER_ACTION_TYPE,
} from "../../context/cartContext";
import { toast } from "react-toastify";

type ProductCardType = {
  product: ProductType;
  dispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
  cart: CartItemType[];
  REDUCER_ACTIONS: typeof REDUCER_ACTION;
};

export const ProductCard = ({
  product,
  dispatch,
  cart,
  REDUCER_ACTIONS,
}: ProductCardType) => {
  return (
    <div className="card">
      <div>
        <img
          src={product.images}
          alt={product.title}
          width="300px"
          height="200px"
        />
      </div>
      <div className="card-content" style={{ textAlign: "center" }}>
        <h4>{product.title}</h4>
        <h4>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
          }).format(product.price)}
        </h4>
        <p>{product.description}</p>
        <button
          onClick={() => {
            const itemExits = cart.find((item) => item.id === product.id);
            if (!itemExits) {
              dispatch({
                type: REDUCER_ACTIONS.ADD,
                payload: { ...product, qty: 1 },
              });
              toast("Item Add To Cart!");
            } else {
              toast.error("Item already in CArt!!!!");
            }
          }}
          style={{ width: "100%" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
