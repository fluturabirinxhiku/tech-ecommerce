import { ErrorMessage, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateField = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <div className="text_field_component">
      <label className="auth_fields mt-1" htmlFor={field.name}>
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        className={`form-control auth_fields mb-1 shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        dateFormat="dd/MM/yy"
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="field_error auth_fields"
      />
    </div>
  );
};

export default DateField;
