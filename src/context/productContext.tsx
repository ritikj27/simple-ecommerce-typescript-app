import {
  Children,
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string;
};

const initialState: ProductType[] = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images: "https://cdn.dummyjson.com/product-images/1/1.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    images: "https://cdn.dummyjson.com/product-images/2/1.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,

    thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
    images: "https://cdn.dummyjson.com/product-images/3/1.jpg",
  },
];

type ContextStateType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};
const initContextState: ContextStateType = {
  products: [],
  setProducts: () => {},
};

export const ProductContext = createContext(initContextState);

type ProductProviderType = {
  children: ReactElement | ReactElement[];
};

const ProductProvider = ({ children }: ProductProviderType) => {
  const [products, setProducts] = useState(initialState);

  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products, setProducts]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
