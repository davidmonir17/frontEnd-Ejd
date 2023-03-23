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
import EditForm from "./EditForm";

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
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeInterface | null>(null);
  const user = useSelector((state) => state.user);

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
        const res = await axios.get("http://localhost:5000/api/Manager/1", {
          headers: {
            Authorization: `Bearer ${user.Token}`,
          },
        });
        setEmployees(res.data);
      } catch (err) {
        alert("could not get employees");
      }
    };
    getEmployees();
  }, []);

  const updateEmployee = (emp: EmployeeInterface) => {
    const tempEmployees = [...employees];
    const neededEmployeeIndex = tempEmployees.findIndex((e) => e.id == emp.id);
    tempEmployees[neededEmployeeIndex].email = emp.email;
    tempEmployees[neededEmployeeIndex].name = emp.name;
    tempEmployees[neededEmployeeIndex].phone = emp.phone;
    tempEmployees[neededEmployeeIndex].depId = emp.depId;
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
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow
                onClick={() => handleOpen(row)}
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
          <EditForm
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
