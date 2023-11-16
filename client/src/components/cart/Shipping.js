import { useDispatch, useSelector } from "react-redux";
import { validateShippingInfo } from "../../validation/validator";
import { Formik, Form } from "formik";
import TextField from "../layout/TextField";
import SelectField from "../layout/SelectField";
import CheckoutSteps from "./CheckoutSteps";

import { saveShippingInfo } from "../../actions/cartActions";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";

const Shipping = ({ history }) => {
  const { shippingInfo, cartCount, error } = useSelector((state) => state.cart);

  if (cartCount === 0) {
    history.push("/cart");
  }

  const dispatch = useDispatch();
  const countries = ["Albania", "Kosovo"];

  const submitHandler = (
    { address, city, postalCode, phoneNo, country },
    actions
  ) => {
    actions.setSubmitting(false);

    dispatch(saveShippingInfo({ address, city, postalCode, phoneNo, country }));
    history.push("/order/confirm");
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />
      <div className="container">
        <CheckoutSteps shipping />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <Formik
              initialValues={{
                address: shippingInfo?.address || "",
                city: shippingInfo?.city || "",
                phoneNo: shippingInfo?.phoneNo || "",
                postalCode: shippingInfo?.postalCode || "",
                country: shippingInfo?.country || countries[0],
              }}
              validationSchema={validateShippingInfo}
              onSubmit={submitHandler}
            >
              <Form className="shadow-sm auth_form">
                {error && <Message variant="danger">{error}</Message>}
                <h1 className="mb-3 text-center">Shipping Info</h1>
                <TextField label="Address" name="address" type="text" />
                <TextField label="City" name="city" type="text" />
                <TextField label="Phone Number" name="phoneNo" type="phone" />
                <TextField label="Postal Code" name="postalCode" type="text" />
                <SelectField
                  label="Country"
                  name="country"
                  options={countries}
                />

                <button
                  id="shipping_btn"
                  type="submit"
                  className="btn btn-primary w-100 "
                >
                  CONTINUE
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
