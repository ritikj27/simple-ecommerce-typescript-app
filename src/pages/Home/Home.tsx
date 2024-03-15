import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/productContext";
import { ProductCard } from "./ProductCard";
import { cartHook } from "../../hook/cartHook";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const { cart, dispatch, REDUCER_ACTIONS } = cartHook();

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  return (
    <>
      <div style={{ textAlign: "center", margin: "50px auto" }}>
        <input
          placeholder="Search"
          type="text"
          value={search}
          onChange={handleSearch}
          style={{
            borderRadius: 10,
            width: 400,
            height: 25,
            fontSize: 20,
            padding: "5px 10px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            dispatch={dispatch}
            cart={cart}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
