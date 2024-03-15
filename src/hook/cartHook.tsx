import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export const cartHook = () => {
  const { dispatch, cart, REDUCER_ACTIONS, totalItems, totalPrice } =
    useContext(CartContext);
  return { dispatch, cart, REDUCER_ACTIONS, totalItems, totalPrice };
};
