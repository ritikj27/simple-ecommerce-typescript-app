import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string;
  qty: number;
};

type initialStateType = {
  cart: CartItemType[];
};

const initialState: initialStateType = {
  cart: [],
};

export const REDUCER_ACTION = {
  ADD: "add",
  REMOVE: "remove",
  QUANTITY: "quantity", // Corrected the typo
  SUBMIT: "submit", // Corrected the typo
};

export type REDUCER_ACTION_TYPE = {
  type: string;
  payload?: CartItemType;
};

function reducer(state: initialStateType, action: REDUCER_ACTION_TYPE) {
  switch (action.type) {
    case REDUCER_ACTION.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }
      const { id, title, description, price, thumbnail, images } =
        action.payload;
      const filterCart = state.cart.filter((item) => item.id !== id);

      const existItem = state.cart.find((item) => item.id === id); // Corrected the assignment to comparison operator
      const qty: number = existItem ? existItem.qty + 1 : 1;
      return {
        ...state,
        cart: [
          ...filterCart,
          { id, title, description, price, thumbnail, images, qty },
        ],
      };
    }
    case REDUCER_ACTION.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE action"); // Corrected the typo
      }
      const { id } = action.payload;

      const filterCart = state.cart.filter((item) => item.id !== id);
      return { ...state, cart: filterCart };
    }
    case REDUCER_ACTION.QUANTITY: {
      const { payload } = action;
      if (!payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }
      const { id, qty } = payload; // Destructure payload after ensuring it exists
      const filterCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, qty }; // Return a new object with updated quantity
        }
        return item;
      });
      return { ...state, cart: filterCart };
    }
    case REDUCER_ACTION.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
}

const cartContextType: {
  dispatch: React.Dispatch<REDUCER_ACTION_TYPE>;
  cart: CartItemType[];
  REDUCER_ACTIONS: typeof REDUCER_ACTION;
  totalPrice: string;
  totalItems: number; // Corrected the type name to lowercase
} = {
  dispatch: () => {},
  cart: [],
  REDUCER_ACTIONS: REDUCER_ACTION,
  totalPrice: "",
  totalItems: 0,
};

export const CartContext = createContext(cartContextType);

type CartProviderType = {
  children: ReactElement | ReactElement[];
};

const CartProvider = ({ children }: CartProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION;
  }, []);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((prev, curr) => (prev += curr.price * curr.qty), 0)
  );
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.title.slice(-4));
    const itemB = Number(b.title.slice(-4));
    return itemA - itemB;
  });

  return (
    <CartContext.Provider
      value={{ dispatch, cart, REDUCER_ACTIONS, totalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
