import { Link } from "react-router-dom";
import Search from "./Search";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { countCartItems } from "../../actions/cartActions";

import { useEffect } from "react";
import { useAlert } from "react-alert";

const Header = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems, cartCount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(countCartItems());
  }, [cartItems, dispatch]);

  const alert = useAlert();
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md sticky-top bg-primary navbar-dark ">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbars"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {user?.role === "Admin" ? (
            ""
          ) : (
            <Link className="navbar-brand" to="/">
              TechShop
            </Link>
          )}

          <div className="collapse navbar-collapse navbars" id="navbar-target1">
            {user?.role !== "Admin" && (
              <Route render={({ history }) => <Search history={history} />} />
            )}

            <ul
              className={`navbar-nav ${
                user?.role === "Admin" ? "ml-auto" : ""
              }   `}
            >
              {user?.role !== "Admin" && (
                <li className="nav-item ">
                  <Link className="nav-link " to="/cart">
                    Cart
                    <span className="cart_nr px-2">{cartCount}</span>
                  </Link>
                </li>
              )}

              {user ? (
                <li className=" dropdown nav-item">
                  <div
                    className=" dropdown-toggle nav-link text-light text-uppercase"
                    type="button"
                    id="dropDownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user && user.name}
                  </div>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropDownMenuButton"
                  >
                    {user && user.role === "Admin" && (
                      <li>
                        <Link className="dropdown-item" to="/admin/dashboard">
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {user && user.role === "Customer" && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/wishlist">
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/customer/orders">
                            Orders
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-danger"
                        to="/"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                !loading && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      LOGIN
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
      {user?.role !== "Admin" && (
        <nav className="navbar navbar-expand-md navbar-light bg-light text-dark second_navbar ">
          <div className="container">
            <div
              className="collapse navbar-collapse navbars "
              id="navbar-target2"
            >
              <ul className="navbar-nav  mb-2 mb-lg-0  w-100 justify-content-between">
                <li className="nav-item ">
                  <Link className="nav-link" to={`/categories/Laptops & PCs`}>
                    Laptops & PCs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories/Cameras">
                    Cameras
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories/Phones & Tablets">
                    Phones & Tablets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories/TV, Video & Audio">
                    TV, Video & Audio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories/Accessories">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
