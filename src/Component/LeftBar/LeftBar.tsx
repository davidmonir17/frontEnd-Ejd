import React from 'react'
import "./LeftBar.scss"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import employees from "../../assets/employees.png"
import task from "../../assets/task.png"



const LeftBar = () => {
  return (
    <div className="leftbar">
        <div className="container">
            <div className="menu">
                <div className="user">
                    <AccountCircleOutlinedIcon/>
                    <span>David Mounir</span>
                </div>
                <div className="items">
                    <img src={employees} alt=''/>
                    <span>Employees</span>

                </div>
                <div className="items">
                    <img src={task} alt=''/>
                    <span>Tasks</span>

                </div>
            </div>
        </div>


    </div>
  )
}

export default LeftBar