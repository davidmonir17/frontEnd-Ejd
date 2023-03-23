import React from "react";
import PropTypes from "prop-types";
import { EmployeeInterface } from "./interfaces";
import { Formik, Form, ErrorMessage, Field, validateYupSchema } from "formik";
import * as Yup from "yup";
import { TextField, Button } from '@mui/material';
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




const EditSchema = Yup.object().shape({
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

  
  return (
    <Formik
      initialValues={{
        id: selectedEmployee?.id,
        email: selectedEmployee?.email,
        name: selectedEmployee?.name,
        birthday: selectedEmployee?.birthday,
        phone: selectedEmployee?.phone,
        depId: selectedEmployee?.depId,
        
      }}
      validationSchema={EditSchema}
      enableReinitialize={true}
      onSubmit={async (values) => {
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
      }}
    >
      {(formik) => (

      <Form>
       
          <div style={{ margin: '15px 0px' }}>
            <Field sx={{
               fontSize: 14,
               minWidth: 300,
            }} as={TextField}  type="text" id="email" name="email" label="Email" />
            {/* {errors.name && touched.name && <div>{errors.name}</div>} */}
            <ErrorMessage name="email">
            { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <div  style={{ display: 'flex', marginBottom:'15px ', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <Field as={TextField}  type="text" id="name" name="name" label="Name" />
            {/* {errors.name && touched.name && <div>{errors.name}</div>} */}
            <ErrorMessage name="name"  >
            { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          
          </div>
          {/* <DatePicker
            label="Select Date"
            value={values.date}
            onChange={(value) => setFieldValue('date', value)}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => <TextField {...params} />}
          /> */}
      
      <div>
            <Field as={TextField} inputProps={{ min: "1920-01-24", max: "2020-05-31" }} type="date" id="Birthday" name="birthday" />
            {/* {errors.name && touched.name && <div>{errors.name}</div>} */}
            <ErrorMessage name="birthday" >
            { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>
      
          </div>


          <div>
            <Field disabled as={TextField}  type="text" id="depId" name="depId" label="Department Id" />
            {/* {errors.name && touched.name && <div>{errors.name}</div>} */}
           <ErrorMessage   name="depId" >
            { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
           
          </div>
          <div>
            <Field as={TextField}  type="text" id="phone" name="phone" label="Phone" />
            {/* {errors.name && touched.name && <div>{errors.name}</div>} */}
            <ErrorMessage name="phone" >
            { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>
          <MyButton variant="contained" color="primary" type="submit">
            Submit
          </MyButton>
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
