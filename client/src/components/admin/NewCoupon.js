import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { newCoupon, clearErrors } from "../../actions/couponActions";
import { NEW_COUPON_RESET } from "../../constants/couponConstants";
import {} from "../../validation/validator";
import { Formik, Form } from "formik";
import { useAlert } from "react-alert";
import TextField from "../layout/TextField";
import DateField from "../layout/DateField";

const NewCoupon = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newCoupon);

  useEffect(() => {
    if (success) {
      history.push("/admin/coupons");
      alert.success("Product created successfully");
      dispatch({ type: NEW_COUPON_RESET });
      dispatch(clearErrors());
    }
  }, [dispatch, success, history, loading, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New Coupon"} />
          <div className="row wrapper">
            {error && <Message variant="danger">{error}</Message>}
            <div className="col-10 col-lg-5">
              <Formik
                initialValues={{
                  name: "",
                  discount: "",
                  expiry: new Date(),
                }}
                onSubmit={({ name, discount, expiry }, actions) => {
                  actions.setSubmitting(false);
                  const formData = new FormData();
                  formData.set("name", name);
                  formData.set("discount", discount);
                  formData.set("expiry", expiry);
                  dispatch(newCoupon(formData));
                }}
              >
                {({ values }) => (
                  <Form className="shadow-sm auth_form">
                    {error && <Message variant="danger">{error}</Message>}
                    <h1 className="mb-3 text-center">New Coupon</h1>

                    <TextField label="Name" name="name" type="text" />
                    <TextField label="Discount" name="discount" type="text" />
                    <DateField label="Expiry Date" name="expiry" />

                    <button
                      id="login_button"
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewCoupon;
