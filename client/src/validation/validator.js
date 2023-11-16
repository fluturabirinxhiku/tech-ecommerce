import * as Yup from "yup";
export const validateRegistration = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters long.")
    .max(30, "Must be less than 30 characters long.")
    .required("Name is required."),
  email: Yup.string().email("Email is invalid.").required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm Password is required."),
});
export const validateLogin = Yup.object({
  email: Yup.string().email("Email is invalid.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});
export const validateNewPassword = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Password Confirmation is required."),
});

export const validateUpdatedPassword = Yup.object({
  oldPassword: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required"),
  newPassword: Yup.string()
    .notOneOf([Yup.ref("oldPassword"), null], "Passwords must not match.")
    .required("New Password is required."),
});

export const validateEmail = Yup.object({
  email: Yup.string().email("Email is invalid.").required("Email is required."),
});

export const validateProfileUpdate = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters long.")
    .max(30, "Must be less than 30 characters long.")
    .required("Name is required."),
  email: Yup.string().email("Email is invalid.").required("Email is required."),
});

const countries = ["Albania", "Kosovo"];

export const validateShippingInfo = Yup.object({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  phoneNo: Yup.string()
    .matches(
      /^\+{0,1}\({0,1}[0-9]{2,5}\){0,1}[-\s]{0,1}[0-9]{1,2}[-\s]{0,1}[0-9]{1,3}[-\s]{0,1}[0-9]{1,4}$/,
      "Invalid phone number. Try the +123 11 222 333 format"
    )
    .max(20, "Must be less than 21 characters")
    .min(8, "Must be at least 8 digits long")
    .required("Phone Number is required"),
  postalCode: Yup.string()
    .min(4, "Must be at least 4 digits long")
    .max(5, "Must be less than 6 digits long")
    .matches(/[0-9]{4,5}/, "Postal Code must contain digits only")
    .required("Postal Code is required"),
  country: Yup.string().required("Please select a country").oneOf(countries),
});
const categories = [
  "Cameras",
  "Laptops & PCs",
  "Accessories",
  "Headphones",
  "TV, Video & Audio",
  "Phones & Tablets",
  "Gaming",
];
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
export const validateProduct = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number("Price should be a number").required("Price is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Please select a category").oneOf(categories),
  stock: Yup.number().required("Stock is required"),
  brand: Yup.string().required("Brand is required"),
});

const roles = ["Customer", "Admin"];
export const validateUpdateUser = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters long.")
    .max(30, "Must be less than 30 characters long.")
    .required("Name is required."),
  email: Yup.string().email("Email is invalid.").required("Email is required."),
  role: Yup.string().required("Please select a role").oneOf(roles),
});
