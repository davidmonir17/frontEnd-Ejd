import React from "react";
import PropTypes from "prop-types";
import { EmployeeInterface } from "./interfaces";

import { Formik, Form, ErrorMessage, Field, validateYupSchema } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
  depId: Yup.number().required("Required"),
});

function EditForm({
  selectedEmployee,
  handleClose,
  updateEmployee,
}: {
  selectedEmployee: EmployeeInterface | null;
  handleClose: () => void;
  updateEmployee: (emp: EmployeeInterface) => void;
}) {
  return (
    <Formik
      initialValues={{
        email: selectedEmployee?.email,
        name: selectedEmployee?.name,
        phone: selectedEmployee?.phone,
        depId: selectedEmployee?.depId,
      }}
      validationSchema={LoginSchema}
      enableReinitialize={true}
      onSubmit={async (values) => {
        try {
          //call backend
          handleClose();
          //updateEmployee(values);
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
          <Field name="name" />
          <ErrorMessage name="name" />
          <Field name="phone" />
          <ErrorMessage name="phone" />
          <Field name="depId" />
          <ErrorMessage name="depId" />
          <button disabled={formik.isSubmitting} type="submit">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default EditForm;
