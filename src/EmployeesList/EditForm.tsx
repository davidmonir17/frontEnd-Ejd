import React from "react";
import PropTypes from "prop-types";
import { EmployeeInterface } from "./interfaces";
import { Formik, Form, ErrorMessage, Field, validateYupSchema } from "formik";
import * as Yup from "yup";
import { TextField, Button, DialogActions } from '@mui/material';
import { useSelector } from "../store";
import axios from "axios";
import { styled } from '@mui/material/styles';

const MyButton = styled(Button)({
  margin: '8px',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});




const 
disabled = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
  depId: Yup.number().required("Required"),
  birthday: Yup.date().required("Required"),
});




function EditFormEmploye({
  selectedEmployee,
  handleClose,
  updateEmployee,
}: {
  selectedEmployee: EmployeeInterface | null;
  handleClose: () => void;
  updateEmployee: (emp: EmployeeInterface) => void;
}) {
  const user = useSelector((state) => state.user);
  const initialValues = {
    id: selectedEmployee?.id,
        email: selectedEmployee?.email,
        name: selectedEmployee?.name,
        birthday: selectedEmployee?.birthday,
        phone: selectedEmployee?.phone,
        depId: selectedEmployee?.depId
  };

  const handleSubmit = async (values: any) => {
    try {
          
      // call backend
       const res = await axios.put(`https://localhost:44339/api/Manager/${user.empiId}`,values, {
       headers: {
         Authorization: `Bearer ${user.Token}`,
       },
     });
     //console.log(res);
     const newBirthday = new Date(res.data.birthday).toISOString().substring(0, 10);
    
     res.data.birthday=newBirthday
               //birthday:new Date(...res.data.birthday).toISOString().substring(0, 10)
     updateEmployee(res.data);
     handleClose();
     } catch (err) {
       console.log(err);
       alert("Could not login");
     }
   }
  


  
  
  return (
    <Formik initialValues={initialValues} validationSchema={
      disabled
    } onSubmit={handleSubmit}>
       {({ errors, touched })=> ( 

      <Form >
       
       <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

         
       <Field
              name="name"
              as={TextField}
              label="Name"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
         
      
      
        <Field
        name="phone"
        as={TextField}
        label="Phone"
        fullWidth
        variant="outlined"
        margin="normal"
        error={touched.phone && Boolean(errors.phone)}
        helperText={touched.phone && errors.phone}
      />
      <Field
      disabled
      name="depId"
      as={TextField}
      label="Department Id"
      fullWidth
      variant="outlined"
      margin="normal"
      error={touched.depId && Boolean(errors.depId)}
      helperText={touched.depId && errors.depId}
    />
      <Field
                  name="birthday"
                  as={TextField}
                  label="Birth date"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={touched.birthday && Boolean(errors.birthday)}
                  helperText={touched.birthday && errors.birthday}
                />
       
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </DialogActions>
      </Form>
        // <Form>
        //   <Field type="email" name="email" />
        //   <ErrorMessage name="email" />
        //   <Field name="name" />
        //   <ErrorMessage name="name" />
        //   <Field name="phone" />
        //   <ErrorMessage name="phone" />
        //   <Field name="depId" />
        //   <ErrorMessage name="depId" />
        //   <button disabled={formik.isSubmitting} type="submit">
        //     Login
        //   </button>
        // </Form>


      )}
    </Formik>
  );
}

export default EditFormEmploye;
