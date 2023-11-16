import { useEffect } from "react";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";
import { validateNewPassword } from "../../validation/validator";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userActions";
import { NEW_PASSWORD_RESET } from "../../constants/userConstants";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";

const NewPassword = ({ history, match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
      dispatch({ type: NEW_PASSWORD_RESET });
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = ({ password, confirmPassword }, actions) => {
    actions.setSubmitting(false);

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };

  return (
    <>
      <MetaData title={"New Password"} />
      <div className="container">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validateNewPassword}
              onSubmit={submitHandler}
            >
              <Form className="shadow-sm auth_form">
                {error && <Message variant="danger">{error}</Message>}
                <h1 className="mb-3 text-center">New Password</h1>

                <TextField label="Password" name="password" type="password" />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />

                <button
                  id="new_password_button"
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={success}
                >
                  Set Password
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
