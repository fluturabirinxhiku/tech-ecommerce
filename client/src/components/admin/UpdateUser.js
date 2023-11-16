import { useEffect } from "react";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";
import Sidebar from "./Sidebar";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";
import SelectField from "../layout/SelectField";
import { validateRegistration } from "../../validation/validator";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = ({ history, match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.userDetails);

  const userId = match.params.id;
  const roles = ["Customer", "Admin"];

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (isUpdated) {
      alert.success("User updated successfully");

      history.push("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, history, isUpdated, userId, user]);

  const submitHandler = ({ email, name, role }, actions) => {
    actions.setSubmitting(false);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <>
      <MetaData title={`Update User`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: user?.name || "",
                  email: user?.email || "",
                  role: user?.role || "",
                }}
                onSubmit={submitHandler}
              >
                <Form className="shadow-sm auth_form">
                  {error && <Message variant="danger">{error}</Message>}
                  <h1 className="mb-3 text-center">Update User</h1>

                  <TextField label="Name" name="name" type="text" />
                  <TextField label="Email" name="email" type="email" />

                  <SelectField
                    label="Role"
                    name="role"
                    options={["Customer", "Admin"]}
                  />

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    UPDATE
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
