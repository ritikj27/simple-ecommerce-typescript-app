import React from "react";
import { ProductType } from "../../context/productContext";
// import { REDUCER_ACTION_TYPE } from "../../types"; // Assuming REDUCER_ACTION_TYPE is defined in a separate types file
import { REDUCER_ACTION, REDUCER_ACTION_TYPE } from "../../context/cartContext";

type ProductCardType = {
  product: ProductType;
  dispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
  REDUCER_ACTIONS: typeof REDUCER_ACTION;
};

export const ProductCard = ({
  product,
  dispatch,
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
          onClick={() =>
            dispatch({
              type: REDUCER_ACTIONS.ADD,
              payload: { ...product, qty: 1 },
            })
          }
          style={{ width: "100%" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
