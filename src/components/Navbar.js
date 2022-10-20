import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useNavigate();
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div class="nav-wrapper blue darken-4">
        <NavLink to="#" className="brand-logo">
          ToDo
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
