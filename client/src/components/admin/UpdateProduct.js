import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";
import TextField from "../layout/TextField";
import SelectField from "../layout/SelectField";
import FileField from "../layout/FileField";
import TextAreaField from "../layout/TextAreaField";
import Sidebar from "./Sidebar";
import { Formik, Form } from "formik";
import { validateProduct } from "../../validation/validator";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const categories = [
    "Cameras",
    "Laptops & PCs",
    "Accessories",
    "Headphones",
    "TV, Video & Audio",
    "Phones & Tablets",
    "Gaming",
  ];

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  let productId = match.params.id;

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setOldImages(product.images);
  }, [product.images]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product updated successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, history, updateError, alert]);

  return (
    <Fragment>
      <MetaData title={"Update Product"} />
      <div className="row">
        <div className="col-12 col-md-2 ">
          <Sidebar />
        </div>

        <div className="col-12 col-md-8 mx-auto">
          <Fragment>
            <div className="wrapper my-5">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: product?.name || "",
                  price: product?.price || 0,
                  description: product?.description || "",
                  category: product?.category || categories[0],
                  stock: product?.stock || 1,
                  brand: product?.brand || "",
                  images: product?.images || [],
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
                    if (typeof image === "object") {
                      formData.append("images[]", image);
                    } else if (typeof image === "string") {
                      formData.append("images", image);
                    }
                  });

                  dispatch(updateProduct(product._id, formData));
                }}
              >
                {(props) => (
                  <Form
                    className="shadow-sm auth_form"
                    encType="multipart/form-data"
                  >
                    {error && <Message variant="danger">{error}</Message>}
                    <h1 className="mb-3 text-center">Update Product</h1>
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
                          setOldImages([]);

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
                    {oldImages &&
                      oldImages.map((img) => (
                        <img
                          key={img.url}
                          src={img.url}
                          alt={img.url}
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}

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
                      UPDATE
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

export default UpdateProduct;
