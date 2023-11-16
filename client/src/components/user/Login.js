import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { login, clearErrors } from "../../actions/userActions";
import { validateLogin } from "../../validation/validator";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";
import { useLocation } from "react-router-dom";

const Login = ({ history }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user && user.role === "Customer") {
      history.push(redirect);
      dispatch(clearErrors());
    }
    if (user && user.role === "Admin") {
      history.push("/admin/dashboard");
      dispatch(clearErrors());
    }
  }, [redirect, dispatch, user, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Login"} />
          <div className="container">
            <div className="row wrapper">
              {location.state?.message && (
                <Message variant="danger">{location.state?.message}</Message>
              )}
              <div className="col-10 col-lg-5">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                  }}
                  validationSchema={validateLogin}
                  onSubmit={({ email, password }, actions) => {
                    actions.setSubmitting(false);
                    dispatch(login(email, password));
                  }}
                >
                  <Form className="shadow-sm auth_form">
                    {error && <Message variant="danger">{error}</Message>}
                    <h1 className="mb-3 text-center">Login</h1>

                    <TextField label="Email" name="email" type="email" />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                    />

                    <Link
                      to="/password/forgot"
                      className="float-end mb-4 auth_links "
                    >
                      Forgot Password?
                    </Link>
                    <button
                      id="login_button"
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      LOGIN
                    </button>

                    <Link
                      to="/register"
                      className="float-end  auth_links
                  "
                    >
                      No account? Register.
                    </Link>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
