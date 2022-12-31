import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useLogin from "../hooks/useLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const login = useLogin();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().required().email().trim(),
    password: yup.string().required().trim().min(6),
  });

  const onSubmit = async (values) => {
    await login(values.email, values.password);
    // console.log(values);
  };
  return (
    <div className="grid place-items-center mt-32 w-full">
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="colored" />
      <div className="p-5 border-[1px] border-gray-400 rounded-md w-4/12">
        <h1 className="font-bold text-3xl text-center text-blue-700">Login</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form className="mt-5 flex flex-col gap-4">
              <div>
                <Field type="email" placeholder="Email" className="w-full input-auth" name="email" />
                <ErrorMessage name="email">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div>
                <Field type="password" placeholder="Password" className="w-full input-auth" name="password" />
                <ErrorMessage name="password">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <span>
                Belum punya akun?{" "}
                <Link to={"/register"} className="text-blue-500">
                  Register
                </Link>
              </span>
              <button className={`${props.isSubmitting || !props.isValid ? "btn bg-blue-400" : "btn bg-blue-700"}`} type="submit" disabled={!props.isValid || props.isSubmitting}>
                {props.isSubmitting ? "Please Wait" : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
