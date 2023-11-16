import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";
import TextField from "../layout/TextField";
import SelectField from "../layout/SelectField";
import FileField from "../layout/FileField";
import TextAreaField from "../layout/TextAreaField";
import Sidebar from "./Sidebar";
import { Formik, Form } from "formik";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { validateProduct } from "../../validation/validator";

const NewProduct = ({ history }) => {
  // const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Cameras",
    "Laptops & PCs",
    "Accessories",
    "Headphones",
    "TV, Video & Audio",
    "Phones & Tablets",
    "Gaming",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (success) {
      history.push("/admin/products");
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, success, history, loading]);

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2 ">
          <Sidebar />
        </div>

        <div className="col-12 col-md-8 mx-auto">
          <Fragment>
            <div className="wrapper my-5">
              <Formik
                initialValues={{
                  name: "Test",
                  price: 1,
                  description: "Test Description",
                  category: categories[0],
                  stock: 1,
                  brand: "",
                  images: [],
                }}
                validationSchema={validateProduct}
                onSubmit={(
                  { name, price, description, category, stock, brand, images },
                  actions
                ) => {
                  actions.setSubmitting(false);

                  const formData = new FormData();
                  formData.set("name", name);
                  formData.set("price", price);
                  formData.set("description", description);
                  formData.set("category", category);
                  formData.set("stock", stock);
                  formData.set("brand", brand);

                  images.forEach((image) => {
                    formData.append("images", image);
                  });

                  dispatch(newProduct(formData));
                }}
              >
                {(props) => (
                  <Form className="shadow-sm auth_form">
                    {error && <Message variant="danger">{error}</Message>}
                    <h1 className="mb-3 text-center">New Product</h1>
                    <TextField label="Name" name="name" type="text" />
                    <TextField label="Price" name="price" type="text" />
                    <TextAreaField
                      label="Description"
                      name="description"
                      rows="8"
                    />
                    <SelectField
                      label="Category"
                      name="category"
                      options={categories}
                    />
                    <TextField label="Stock" name="stock" type="number" />
                    <TextField label="Brand" name="brand" type="text" />
                    <label className="auth_fields mt-1">Images</label>
                    <div className="custom-file">
                      <FileField
                        type="file"
                        accept="image/*"
                        name="product_images"
                        className="custom-file-input"
                        id="customFile"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          setImagesPreview([]);
                          const arr = [];

                          files.forEach((file) => {
                            const reader = new FileReader();

                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                arr.push(reader.result);
                                setImagesPreview(arr);

                                props.setFieldValue("images", arr);
                              }
                            };

                            reader.readAsDataURL(file);
                          });
                        }}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Images
                      </label>
                    </div>

                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}

                    <button
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3"
                      disabled={loading ? true : false}
                    >
                      CREATE
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
