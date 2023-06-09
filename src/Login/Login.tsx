import React from "react";
import "./Login.scss";
import { Formik, Form, ErrorMessage, Field, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "../store";
import { login } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
    const  user=  JSON.parse(token);
      // If user token exists in local storage, dispatch login action with token
      dispatch(login( user ));
      navigate("/");
    }
  }, [dispatch, navigate]);


  return (
    <div className="loginN">
      <div className="cardN">
        <div className="leftN">
          <h1>Hello world.</h1>
          <p>
            my name is david and make this task for to test my api , this page
            wil to show how to login to my Ejada Task , thank you for
            inetresting.
          </p>
          <span> Don't have an account </span>
        </div>
        <div className="rightN">
          <h1>Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const res = await axios.post(
                  "https://localhost:44339/api/Admin/token",
                  { ...values },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                dispatch(login(res.data));
                localStorage.setItem("userToken", JSON.stringify(res.data)); // Store user token in local storage
                navigate("/");
              } catch (err) {
                console.log(err);
                alert("Could not login");
              }
            }}
          >
            {(formik) => (
              <Form>
                <Field type="email" name="email" />
                <ErrorMessage name="email" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" />
                <button disabled={formik.isSubmitting} type="submit">
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
