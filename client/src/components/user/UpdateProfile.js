import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import Message from "../layout/Message";
import MetaData from "../layout/MetaData";
import { updateProfile, clearErrors } from "../../actions/userActions";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";
import { validateProfileUpdate } from "../../validation/validator";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, error, isUpdated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Profile updated successfully");

      history.push("/profile");

      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch(clearErrors());
    }
  }, [isUpdated, alert, dispatch, history]);

  const submitHandler = ({ name, email }, actions) => {
    actions.setSubmitting(false);
    dispatch(updateProfile(name, email));
  };

  return (
    <>
      <MetaData title={"Update Profile"} />
      <div className="container">
        <div className="row wrapper">
          {error && <Message variant="danger">{error}</Message>}
          <div className="col-10 col-lg-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: user?.name || "",
                email: user?.email || "",
              }}
              validationSchema={validateProfileUpdate}
              onSubmit={submitHandler}
            >
              <Form className="shadow-sm auth_form">
                <h1 className="mb-3 text-center">Update Profile</h1>
                <TextField label="Name" name="name" type="text" />
                <TextField label="Email" name="email" type="email" />

                <button
                  id="update_profile_button"
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Update
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
