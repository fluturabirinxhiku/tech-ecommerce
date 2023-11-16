import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isCustomer,
  isAdmin,
  component: Component,
  ...rest
}) => {
  const { loading, user } = useSelector((state) => state.auth);

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
            if (isAdmin && user.role !== "Admin") {
              return <Redirect to="/" />;
            }
            if (isCustomer && user.role !== "Customer") {
              return <Redirect to="/admin/dashboard" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};
export default ProtectedRoute;
