import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./components/Layout";

import { Cart } from "./pages/cart/Cart";
import Home from "./pages/Home/Home";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home/>} />
        <Route path="cart" element={<Cart/>} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
