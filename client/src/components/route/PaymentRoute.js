import { Route, Redirect } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStripeApiKey } from "../../actions/cartActions";

import Payment from "../cart/Payment";

const PaymentRoute = ({ component: Component, ...rest }) => {
  const { loading, user } = useSelector((state) => state.auth);
  const { stripeKey } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStripeApiKey());
  }, [dispatch]);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (!user) {
              return (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: {
                      message: "You need to log in to access that resource!",
                    },
                  }}
                />
              );
            }
            return (
              stripeKey && (
                <Elements stripe={loadStripe(stripeKey)}>
                  <Payment {...props} />
                </Elements>
              )
            );
          }}
        />
      )}
    </>
  );
};
export default PaymentRoute;
