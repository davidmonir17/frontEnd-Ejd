import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem  } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "../store";
import axios from "axios";
import { TaskInterface } from './taskInterface';
import { EmployeeInterface } from '../EmployeesList/interfaces';



const EditTask = ({ selectedTask ,open , onClose,EditeTask }:{
    
    selectedTask: TaskInterface | null,
    onClose:()=> void,
    open:boolean,
    EditeTask: (emp: TaskInterface) => void;
}) => {

    

    useEffect(() => {
        const getEmployees = async () => {
          try {
            const res = await axios.get(`https://localhost:44339/api/Manager/${user.empiId}`, {
              headers: {
                Authorization: `Bearer ${user.Token}`,
              },
            });
            const tempEmployees1= [...res.data];
          
            setEmployees(  tempEmployees1.map(emp=>{
              return{
    
                ...emp,
                birthday: new Date(emp.birthday).toISOString().substring(0, 10)
              };
            }));

          
          } catch (err) {
            alert("could not get employees");
          }
        };
        getEmployees();
       
      
      }, []);



    const handleClose = () => {
        onClose();
      };

      const user = useSelector((state) => state.user);
      const [selectedEmployee, setSelectedEmployee] =  useState<EmployeeInterface|null>();
      const [selectedEmployeeid, setSelectedEmployeeid] =  useState( 0);
      const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

      const initialValues = {
        name: selectedTask?.name,
        description: selectedTask?.description,
        submitionDate:selectedTask?.submitionDate,
        selectedEmployee:selectedTask?.employeeId
      };
    
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('description is required'),
        submitionDate: Yup.date().required('Assigned Date is required')
      });
    
      const handleSubmit = async (values: any) => {

        const taskvalue={
            id :selectedTask?.id ,
          name : values.name,
          description  :values.description,
          submitionDate:new Date(values.submitionDate),
          statuesId:selectedTask?.statuesId,
          mangerId:selectedTask?.mangerId,
          employeeId:selectedEmployeeid,
        }

      
  
      try {
            
          // call backend
           const res = await axios.put(`https://localhost:44339/api/Manager/Update-Task/${user.empiId}`,taskvalue, {
           headers: {
             Authorization: `Bearer ${user.Token}`,
           },
         });
         //console.log(res);
         const newsubmition = new Date(res.data.submitionDate).toISOString().substring(0, 10);
        
         res.data.submitionDate=newsubmition;
                   //birthday:new Date(...res.data.birthday).toISOString().substring(0, 10)
                   EditeTask(res.data);
         handleClose();
         } catch (err) {
           console.log(err);
           alert("Could not login");
         }
        handleClose();
      };
    const setsubmeit=(event:any)=>{
      setSelectedEmployeeid(event.target.value);
     // console.log(`da ${selectedEmployeeid}`);
      //setSelectedEmployee(event.target.value) 
       }
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Employee</DialogTitle>
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
              name="description"
              as={TextField}
              label="description"
              fullWidth
              variant="outlined"
              margin="normal"
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
            <Select
          label="Employee"
          fullWidth
          defaultValue={selectedTask?.employeeId}
          value={selectedEmployee?.id}
          onChange={(event) => setsubmeit(event)}
          margin="none"
        >
          {employees.map((employee) => (
            <MenuItem key={employee.id} value={employee.id}>
              {employee.name}
            </MenuItem>
          ))}
        </Select>
            <Field
              name="submitionDate"
              as={TextField}
              label="Assigned Date"
              fullWidth
              variant="outlined"
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.submitionDate && Boolean(errors.submitionDate)}
              helperText={touched.submitionDate && errors.submitionDate}
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
  )
}

export default EditTask