import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useauth } from "../../Context/context";
import SearchImput from "../Form/SearchImput";
function Header() {
  const { prueba, MostrarUsuario } = useauth();

  const Logearse = () => {
    MostrarUsuario(null, "");
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FaCartShopping /> ECOMMERCE APP
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <SearchImput />
              <li className="nav-item">
                <NavLink to="/category" className="nav-link" href="#">
                  Category
                </NavLink>
              </li>
              {/* si no hay un usuario que aparezcan register y login , en todo caso que aparezca 
              el login */}
              {!prueba.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      USER
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            prueba.user.role == 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          DASHBOARD
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={Logearse}
                          className="dropdown-item"
                          href="#"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link" href="#">
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
