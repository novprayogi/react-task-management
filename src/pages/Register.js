import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useRegistration from "../hooks/useRegistration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const register = useRegistration();
  const initialValues = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
  };

  const validationSchema = yup.object({
    displayName: yup.string().required().trim(),
    email: yup.string().required().email().trim(),
    password: yup.string().required().trim().min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required(),
    photo: yup.mixed().required(),
  });

  const onSubmit = async (values) => {
    await register(values.email, values.password, values.photo, values.displayName);
    console.log(values);
  };
  return (
    <div className="grid place-items-center mt-10 w-full">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="colored" />
      <div className="p-5 border-[1px] border-gray-400 rounded-md w-4/12">
        <h1 className="font-bold text-3xl text-center text-blue-700">Register</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form className="mt-5 flex flex-col gap-4">
              <div>
                <Field type="text" placeholder="Display Name" className="w-full input-auth" name="displayName" />
                <ErrorMessage name="displayName">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div>
                <Field type="email" placeholder="Email" className="w-full input-auth" name="email" />
                <ErrorMessage name="email">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div>
                <Field type="password" placeholder="Password" className="w-full input-auth" name="password" />
                <ErrorMessage name="password">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div>
                <Field type="password" placeholder="Confirm Password" className="w-full input-auth" name="confirmPassword" />
                <ErrorMessage name="confirmPassword">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div>
                <h1 className="font-medium mb-2">Photo Profile</h1>
                <input type="file" accept="image/png, image/jpg, image/jpeg" name="photo" onChange={(e) => props.setFieldValue("photo", e.target.files[0])} />
                <ErrorMessage name="photo">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <span>
                Sudah punya akun?{" "}
                <Link to={"/login"} className="text-blue-500">
                  Login
                </Link>
              </span>
              <button className={`${props.isSubmitting || !props.isValid ? "btn bg-blue-400" : "btn bg-blue-700"}`} type="submit" disabled={!props.isValid || props.isSubmitting}>
                {props.isSubmitting ? "Please Wait" : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
