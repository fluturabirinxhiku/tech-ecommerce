import { useEffect } from "react";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../actions/userActions";
import { validateEmail } from "../../validation/validator";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = ({ email }, actions) => {
    actions.setSubmitting(false);

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  return (
    <>
      <MetaData title={"Forgot Password"} />
      <div className="container">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validateEmail}
              onSubmit={submitHandler}
            >
              <Form className="shadow-sm auth_form">
                {error && <Message variant="danger">{error}</Message>}
                <h1 className="mb-3 text-center">Forgot Password</h1>

                <TextField label="Email" name="email" type="email" />

                <button
                  id="forgotPassword_btn"
                  type="submit"
                  className="btn btn-primary w-100 "
                  disabled={loading ? true : false}
                >
                  Send Email
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
