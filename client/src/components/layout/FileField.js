import { ErrorMessage, useField } from "formik";

const FileField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="text_field_component">
      <label className="auth_fields mt-1" htmlFor={field.name}>
        {label}
      </label>
      <input
        className={`form-control auth_fields mb-1 shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
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

export default FileField;
