import React from 'react'
import "./LeftBar.scss"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import employees from "../../assets/employees.png"
import task from "../../assets/task.png"
import { useSelector } from "../../store";
import { useNavigate } from "react-router-dom";



const LeftBar = () => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

const tasksHandler=()=>{
    navigate("/Manager/Tasks");
}

const employeeHandler=()=>{
    navigate("/");
}

  return (
    <div className="leftbar">
        <div className="container">
            <div className="menu">
                <div className="user">
                    <AccountCircleOutlinedIcon/>
                    <span>{user.username}</span>
                </div>
                <div className="items" onClick={employeeHandler}>
                    <img src={employees} alt=''/>
                    <span>Employees</span>

                </div>
                <div className="items" onClick={tasksHandler}>
                    <img src={task} alt=''/>
                    <span>Tasks</span>

                </div>
            </div>
        </div>


    </div>
  )
}

export default LeftBar