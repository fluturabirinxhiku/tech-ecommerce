import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../layout/Message";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { registerUser, clearErrors } from "../../actions/userActions";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";
import { validateRegistration } from "../../validation/validator";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      history.push("/");
      dispatch(clearErrors());
    }
  }, [dispatch, user, history]);

  return (
    <>
      <MetaData title={"Registration"} />
      <div className="container">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validateRegistration}
              onSubmit={({ name, email, password }, actions) => {
                actions.setSubmitting(false);
                dispatch(registerUser(name, email, password));
              }}
            >
              <Form className="shadow-sm auth_form">
                {error && <Message variant="danger">{error}</Message>}
                <h1 className="mb-3 text-center">Register</h1>
                <TextField label="Name" name="name" type="text" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />

                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  REGISTER
                </button>
                <Link
                  to="/login"
                  className="float-end auth_links
                  "
                >
                  Already have an account? Login.
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
