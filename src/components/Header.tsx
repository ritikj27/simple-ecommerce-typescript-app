import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div
        className="header-item"
        style={{ fontSize: 20, fontWeight: "bold", color: "gold" }}
      >
        <i>Gada electronics</i>
      </div>

      <div className="header-item">
        <div className="header-item-child">
          <div>
            <NavLink to="/cart">Cart</NavLink>
          </div>
          <div>
            {" "}
            <NavLink to="/">Home</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
