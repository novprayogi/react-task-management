import React, { useEffect, useState } from "react";
import Select from "react-select";
import useGetUsers from "../hooks/useGetUsers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = () => {
  const { users } = useGetUsers();
  const [optionUser, setOptionUser] = useState([]);
  useEffect(() => {
    if (users) {
      const option = users.map((user) => {
        return { value: user, label: user.displayName };
      });
      setOptionUser(option);
    }
  }, [users]);

  const categories = [
    { value: "UX Designer", label: "UX Designer" },
    { value: "UI Designer", label: "UI Designer" },
    { value: "Front End", label: "Front End" },
    { value: "Back End", label: "Back End" },
  ];

  const initialValues = {
    title: "",
    description: "",
    duedate: "",
    users: [],
    categories: "",
  };

  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    duedate: yup.string().required(),
    users: yup.array().required().min(1),
    categories: yup.string().required(),
  });

  const onSubmit = async (values) => {
    await addDoc(collection(db, "tasks"), {
      title: values.title,
      description: values.description,
      duedate: values.duedate,
      categories: values.categories,
      users: values.users,
      completed: false,
      timestamp: serverTimestamp(),
      comments: [],
    }).then(() => {
      //notif
      toast.success("Data Sukses ditambahkan", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  };
  return (
    <div>
      <h1 className="text-2xl font-medium">Add Task</h1>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="colored" />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(props) => {
          return (
            <Form className="py-3">
              <div className="mb-3 flex flex-col">
                <label className="mb-2 font-medium" htmlFor="title">
                  Title
                </label>
                <Field id="title" type="text" name="title" placeholder="Title" className="input-text" />
                <ErrorMessage name="title">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div className="mb-3 flex flex-col">
                <label className="mb-2 font-medium" htmlFor="description">
                  Description
                </label>
                <Field as="textarea" id="description" type="text" name="description" placeholder="Description" className="input-text" />
                {/* <span className="error-message">Error</span> */}
                <ErrorMessage name="description">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="duedate" className="mb-2 font-medium">
                  Set Due Date
                </label>
                <Field id="duedate" type="date" name="duedate" className="outline-none border-[1px] self-start py-1 px-2 rounded-md" />
                {/* <span className="error-message">Error</span> */}
                <ErrorMessage name="duedate">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="users" className="mb-2 font-medium">
                  User
                </label>
                <Select
                  options={optionUser}
                  isMulti
                  onChange={(e) => {
                    const value = e.map((v) => v.value);
                    props.setFieldValue("users", value);
                  }}
                  name="users"
                />
                {/* <input id="duedate" type="date" name="duedate" className="outline-none border-[1px] self-start py-1 px-2 rounded-md" /> */}
                <ErrorMessage name="users">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="categories" className="mb-2 font-medium">
                  Kategori
                </label>
                <Select
                  options={categories}
                  onChange={(e) => {
                    props.setFieldValue("categories", e.value);
                  }}
                  name="categories"
                />
                {/* <input id="duedate" type="date" name="duedate" className="outline-none border-[1px] self-start py-1 px-2 rounded-md" /> */}
                <ErrorMessage name="categories">{(err) => <span className="error-message">{err}</span>}</ErrorMessage>
              </div>
              {/* <button type="submit" className="bg-blue-700 hover:bg-blue-800 btn">
                Add Task
              </button> */}
              <button className={`${props.isSubmitting || !props.isValid ? "btn bg-blue-400" : "btn bg-blue-700"}`} type="submit" disabled={!props.isValid || props.isSubmitting}>
                {props.isSubmitting ? "Please Wait" : "Add Task"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddTask;
