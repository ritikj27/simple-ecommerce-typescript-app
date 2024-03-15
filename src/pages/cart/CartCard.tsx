import React, { ChangeEvent, ReactElement } from "react";
import {
  CartItemType,
  REDUCER_ACTION,
  REDUCER_ACTION_TYPE,
} from "../../context/cartContext";

type cardCardType = {
  item: CartItemType;
  dispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
  REDUCER_ACTIONS: typeof REDUCER_ACTION;
};

export const CartCard = ({ item, dispatch, REDUCER_ACTIONS }: cardCardType) => {
  const lineTotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });
  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <img src={item.images} width="100px" />
      <p>{item.title}</p>
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
        }).format(item.price)}
      </p>

      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
        }).format(lineTotal)}
      </p>
      <button
        onClick={() =>
          dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item })
        }
      >
        Remove
      </button>
    </div>
  );
};
