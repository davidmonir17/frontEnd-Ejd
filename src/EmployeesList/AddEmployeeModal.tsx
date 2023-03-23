import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "../store";
import axios from "axios";
import { EmployeeInterface } from './interfaces';


const AddEmployeeModal = ({ open , onClose,AddEmployee }:{
    onClose:()=> void,
    open:boolean,
    AddEmployee: (emp: EmployeeInterface) => void;
}) => {
    const handleClose = () => {
      onClose();
    };

    const user = useSelector((state) => state.user);

    const initialValues = {
      name: '',
      phone: '',
      email: '',
      birthdate: ''
    };
  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      phone: Yup.string().required('Phone is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      birthdate: Yup.date().required('Birthdate is required')
    });
  
    const handleSubmit = async (values: any) => {
      console.log(values);

    try {
          
        // call backend
         const res = await axios.post(`https://localhost:44339/api/Manager/${user.empiId}`,values, {
         headers: {
           Authorization: `Bearer ${user.Token}`,
         },
       });
       //console.log(res);
       const newBirthday = new Date(res.data.birthday).toISOString().substring(0, 10);
      
       res.data.birthday=newBirthday
                 //birthday:new Date(...res.data.birthday).toISOString().substring(0, 10)
       AddEmployee(res.data);
       handleClose();
       } catch (err) {
         console.log(err);
         alert("Could not login");
       }
      handleClose();
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
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
                  name="birthdate"
                  as={TextField}
                  label="Birthdate"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={touched.birthdate && Boolean(errors.birthdate)}
                  helperText={touched.birthdate && errors.birthdate}
                />
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" color="primary">Save</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AddEmployeeModal;