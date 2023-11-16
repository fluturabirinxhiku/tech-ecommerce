import "./bootstrap.css";
import "./App.css";
import "./colors.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";

import ProtectedRoute from "./components/route/ProtectedRoute";
import PaymentRoute from "./components/route/PaymentRoute";
import Category from "./components/Category";
import Home from "./components/Home";
import NotFound from "./components/layout/NotFound";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import UpdateProfile from "./components/user/UpdateProfile";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Shipping from "./components/cart/Shipping";
import OrderSuccess from "./components/cart/OrderSuccess";
import OrderList from "./components/admin/OrderList";
import CouponList from "./components/admin/CouponList";
import NewCoupon from "./components/admin/NewCoupon";
import OrderDetails from "./components/order/OrderDetails";
import ProductReviews from "./components/admin/ProductReviews";
import UserList from "./components/admin/UserList";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateUser from "./components/admin/UpdateUser";
import UpdateOrder from "./components/admin/UpdateOrder";

import CustomerOrders from "./components/order/CustomerOrders";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import UpdatePassword from "./components/user/UpdatePassword";
// Payment

function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/search/:keyword" component={Home} exact />
            <Route path="/search" exact>
              <Redirect to="/" />
            </Route>
            <Route path="/products/:id" component={ProductDetails} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <ProtectedRoute path="/profile" component={Profile} exact />

            <ProtectedRoute
              path="/profile/update"
              component={UpdateProfile}
              exact
            />
            <Route path="/categories/:category" component={Category} exact />
            <Route path="/cart" component={Cart} exact />
            <ProtectedRoute
              path="/shipping"
              component={Shipping}
              isCustomer={true}
            />
            <ProtectedRoute
              path="/order/confirm"
              component={ConfirmOrder}
              exact
              isCustomer={true}
            />
            <ProtectedRoute
              path="/success"
              component={OrderSuccess}
              exact
              isCustomer={true}
            />
            <ProtectedRoute
              path="/wishlist"
              component={Wishlist}
              exact
              isCustomer={true}
            />

            <PaymentRoute path="/payment" exact isCustomer={true} />
            <ProtectedRoute
              path="/admin/dashboard"
              component={Dashboard}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/coupons"
              component={CouponList}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/coupons/new"
              component={NewCoupon}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/products"
              component={ProductList}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/products/new"
              component={NewProduct}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/products/:id"
              component={UpdateProduct}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/users"
              component={UserList}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/orders"
              component={OrderList}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/customer/orders"
              component={CustomerOrders}
              exact
              isCustomer={true}
            />

            <ProtectedRoute
              path="/admin/users/:id"
              component={UpdateUser}
              exact
              isAdmin={true}
            />
            <ProtectedRoute
              path="/admin/orders/:id"
              component={UpdateOrder}
              exact
              isAdmin={true}
            />

            <ProtectedRoute path="/orders/:id" component={OrderDetails} exact />
            <ProtectedRoute
              path="/admin/reviews"
              isAdmin={true}
              component={ProductReviews}
              exact
            />

            <Route path="/password/forgot" component={ForgotPassword} exact />
            <Route
              path="/password/reset/:token"
              component={NewPassword}
              exact
            />
            <ProtectedRoute
              path="/password/update"
              component={UpdatePassword}
              exact
            />
            <Route component={NotFound} path="/*" />
          </Switch>
        </div>
        {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
      </div>
    </Router>
  );
}

export default App;
