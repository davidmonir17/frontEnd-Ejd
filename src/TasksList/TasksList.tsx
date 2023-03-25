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
import { Box, Container, Modal, Typography, Pagination } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { TaskInterface } from "./taskInterface";
import AddTaskForEmployeeModal from './AddTaskForEmployeeModal';
import EditTask from "./EditTask";
import { EmployeeInterface } from '../EmployeesList/interfaces';
import ReactPaginate from "react-paginate";


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



const TasksList = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [tasksPerPage, setTasksPerPage] = useState(2);


  const [Tasks, setTasks] = useState<TaskInterface[]>([]);
  const [AddmodalOpen, setAddModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  // const [selectedEmployee, setSelectedEmployee] =  useState<EmployeeInterface|null>(null);


  const [selectedTask, setselectedTask] = useState<TaskInterface | null>(null);
  const user = useSelector((state) => state.user);
  const handleModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
  };

  const handleOpen = async (tsk: TaskInterface) => {
    // try{
    //   const resemp = await axios.get(`https://localhost:44339/api/Manager/${user.empiId}/employee/${tsk?.employeeId}`, {
    //     headers: {
    //       Authorization: `Bearer ${user.Token}`,
    //     },
    //   });
    //   setSelectedEmployee(resemp.data);
    // }
    // catch{
    //   alert("could not delete Task");
    // }
    setselectedTask(tsk);
    setOpen(true);
  };
  const handleClose = () => {
    setselectedTask(null);
    setOpen(false);
  };

  const handlePageClick = (data: any) => {
    console.log(data)
    setCurrentPage(data.selected);
  };


  //delete task
  const DeleteTask=async (taskId:number)=>{
    try {
          const res = await axios.delete(`https://localhost:44339/api/Manager/Delete-Task/${user.empiId}`, {
            headers: {
              Authorization: `Bearer ${user.Token}`,
            },
            params: {
              TaskId: taskId
             
            },
          });
          const tempTask = [...Tasks];
          const filteredTasks = tempTask.filter((task) => task.id !== taskId);
          setTasks(filteredTasks);
        } catch (err) {
          alert("could not delete Task");
        }  
      }
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await axios.get(`https://localhost:44339/api/Manager/${user.empiId}/GetAllTasks`, {
          headers: {
            Authorization: `Bearer ${user.Token}`,
          },
        });
        const tempTask= [...res.data];

        ///grb
        setPageCount(Math.ceil(tempTask.length / tasksPerPage));
        const startIndex = currentPage * tasksPerPage;
        const endIndex = startIndex + tasksPerPage;
    const paginatedTasks = tempTask.slice(startIndex, endIndex);
        
        
        //


        setTasks(  paginatedTasks.map(tsk=>{
          return{

            ...tsk,
            submitionDate: new Date(tsk.submitionDate).toISOString().substring(0, 10)
          };
        }));
       
      } catch (err) {
        alert("could not get Tasks");
      }
    };
    getTasks();
  
  }, [currentPage,Tasks]);


  const AddTaskHandler = (tsk: TaskInterface) => {
    const tempTasks = [...Tasks,tsk];
    setTasks(tempTasks);
  };

  ////grab
  const handleTasksPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTasksPerPage = parseInt(event.target.value);
    setTasksPerPage(newTasksPerPage);
    setPageCount(Math.ceil(Tasks.length / newTasksPerPage));
    setCurrentPage(0);
  };


  //update task for listTasks
  const updatetask = (tsk: TaskInterface) => {
    const temptasks = [...Tasks];
    const neededtaskIndex = temptasks.findIndex((e) => e.id === tsk.id);
    temptasks[neededtaskIndex].name = tsk.name;
    temptasks[neededtaskIndex].description = tsk.description;
    temptasks[neededtaskIndex].submitionDate = tsk.submitionDate;
    temptasks[neededtaskIndex].statuesId = tsk.statuesId;
    temptasks[neededtaskIndex].statues = tsk.statues;
    temptasks[neededtaskIndex].employeeId = tsk.employeeId;
    temptasks[neededtaskIndex].employeeName = tsk.employeeName;
    temptasks[neededtaskIndex].mangerId = tsk.mangerId;
    temptasks[neededtaskIndex].managerName = tsk.managerName;
    setTasks(temptasks);
  };


  return (
    <Container maxWidth="lg">
    <TableContainer sx={{ marginTop: "20px" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="center">Employee Name</TableCell>
            <TableCell align="center">Manager name</TableCell>
            <TableCell align="center">Assigned Date</TableCell>
            <TableCell align="center">statues Name</TableCell>
            <TableCell align="center">
            
    
    <Button  sx={MyButton} onClick={handleModalOpen}> New Task</Button>
    {/* add task modal */}
    <AddTaskForEmployeeModal AddTask={AddTaskHandler} open={AddmodalOpen} onClose={handleModalClose} />
  
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Tasks.map((row) => (
            <TableRow
             
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.employeeName}</TableCell>
              <TableCell align="center">{row.managerName}</TableCell>
              <TableCell align="center">{row.submitionDate.toLocaleString()}</TableCell>
              <TableCell align="center">{row.statues}</TableCell>
              <TableCell align="center"> <ButtonGroup
                    
                    disableElevation
                    aria-label="Disabled elevation buttons">
<Button sx={ {backgroundColor:'red' ,color:'black',flexGrow: 1, flexBasis: '0%' }} onClick={ ()=> DeleteTask(row.id)}> Delete</Button>
<Button  sx={ {backgroundColor:'yellowgreen' , color:'black',flexGrow: 1, flexBasis: '0%' }} 
 onClick={() => handleOpen(row)}> Edite  </Button>
     <EditTask selectedTask={selectedTask} EditeTask={updatetask} open={open} onClose={handleClose} />

</ButtonGroup>
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
   <ReactPaginate
     previousLabel={'previous'}
     nextLabel={'next'}
     breakLabel={'...'}
     breakClassName={'break-me'}
     pageCount={pageCount}
     marginPagesDisplayed={2}
     pageRangeDisplayed={5}
     onPageChange={handlePageClick}
     containerClassName={'pagination'}
     activeClassName={'active'}
   />
 </Box> */}
 <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination 
        count={pageCount} 
        page={currentPage + 1} 
        onChange={(event, page) => setCurrentPage(page - 1)}
        color="primary" 
        variant="outlined" 
      />
    </Box>
  </Container>
 
   )
}

export default TasksList