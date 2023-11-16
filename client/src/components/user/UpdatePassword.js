import { useEffect } from "react";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { validateUpdatedPassword } from "../../validation/validator";

const UpdatePassword = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Password updated successfully");

      history.push("/profile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = ({ oldPassword, newPassword }, actions) => {
    actions.setSubmitting(false);

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", newPassword);

    dispatch(updatePassword(formData));
  };

  return (
    <>
      <MetaData title={"Update Password"} />
      <div className="container">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
              }}
              validationSchema={validateUpdatedPassword}
              onSubmit={submitHandler}
            >
              <Form className="shadow-sm auth_form">
                {error && <Message variant="danger">{error}</Message>}
                <h1 className="mb-3 text-center">Update Password</h1>

                <TextField
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                />

                <button
                  type="submit"
                  id="updatePassword_btn"
                  className="btn btn-primary w-100 "
                  disabled={loading ? true : false}
                >
                  Update Password
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
