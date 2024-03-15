import React, { useEffect } from "react";
import { cartHook } from "../../hook/cartHook";
import { CartCard } from "./CartCard";

export const Cart = () => {
  const { cart, dispatch, REDUCER_ACTIONS } = cartHook();

  return (
    <div>
      {cart.length > 0 ? (
        cart.map((item) => (
          <CartCard
            item={item}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        ))
      ) : (
        <h1>No item in Cart</h1>
      )}
    </div>
  );
};
