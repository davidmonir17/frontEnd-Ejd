import React, { useEffect, useState } from "react";
import { useSelector } from "../store";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EmployeeInterface } from "./interfaces";
import { Box, Container, Modal, Typography } from "@mui/material";
import EditFormEmploye from "./EditForm";
import { date } from "yup";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddEmployeeModal from "./AddEmployeeModal";


const MyButton ={
  margin: '8px',
  background: 'linear-gradient(45deg, #02cf24 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  //height: 48,
  padding: '0 30px',
};


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const EmployeesList = () => {
  const baseURL = "https://jsonplaceholder.typicode.com/posts";
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [AddmodalOpen, setAddModalOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeInterface | null>(null);
  const user = useSelector((state) => state.user);
  const handleModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
  };


  const DeleteEmployee= async (empid:number)=>{
    //console.log(empid);
    try {
      const res = await axios.delete(`https://localhost:44339/api/Manager/${user.empiId}/employee/${empid}`, {
        headers: {
          Authorization: `Bearer ${user.Token}`,
        },
      });
      const tempEmployees = [...employees];
      const filteredEmployees = tempEmployees.filter((employee) => employee.id !== empid);
      setEmployees(filteredEmployees);
    } catch (err) {
      alert("could not delete employees");
    }
  
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = (emp: EmployeeInterface) => {
    setSelectedEmployee(emp);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedEmployee(null);
    setOpen(false);
  };

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

  const AddEmployeehandler = (emp: EmployeeInterface) => {

    console.log(emp);
    const tempEmployees = [...employees,emp];
    console.log(tempEmployees);
   
    setEmployees(tempEmployees);
  };
  const updateEmployee = (emp: EmployeeInterface) => {
    const tempEmployees = [...employees];
    const neededEmployeeIndex = tempEmployees.findIndex((e) => e.id == emp.id);
    tempEmployees[neededEmployeeIndex].email = emp.email;
    tempEmployees[neededEmployeeIndex].name = emp.name;
    tempEmployees[neededEmployeeIndex].phone = emp.phone;
    tempEmployees[neededEmployeeIndex].depId = emp.depId;
    tempEmployees[neededEmployeeIndex].birthday = emp.birthday;
    setEmployees(tempEmployees);
  };

  return (
    <Container maxWidth="lg">
      <TableContainer sx={{ marginTop: "20px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">department Name</TableCell>
              <TableCell align="center">
              
      
      <Button  sx={MyButton} onClick={handleModalOpen}> New Employee</Button>
      <AddEmployeeModal AddEmployee={AddEmployeehandler} open={AddmodalOpen} onClose={handleModalClose} />
    
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow
               
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.departmentName}</TableCell>
                <TableCell align="center"> <ButtonGroup
                      
                      disableElevation
                      aria-label="Disabled elevation buttons">
  <Button sx={ {backgroundColor:'red' ,color:'black',flexGrow: 1, flexBasis: '0%' }} onClick={ ()=> DeleteEmployee(row.id)}> Delete</Button>
  <Button  sx={ {backgroundColor:'yellowgreen' , color:'black',flexGrow: 1, flexBasis: '0%' }}  onClick={() => handleOpen(row)}> Edite  </Button>
</ButtonGroup>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditFormEmploye
            selectedEmployee={selectedEmployee}
            handleClose={handleClose}
            updateEmployee={updateEmployee}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default EmployeesList;
