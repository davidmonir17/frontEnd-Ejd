import React from 'react'
import "./NavBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from "../../store";


const NavBar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className='navbarfom'>
    <div className="leftside">
        <Link to="/" style={{textDecoration:'none'}}>
             <span>David Task</span>
        </Link>
             <HomeOutlinedIcon/>
    </div>    
    <div className="rightside">
            <AccountCircleOutlinedIcon/>
        <div className="userform">
            <span>{user.Email}</span>
        </div>
        </div>    
    </div>
  )
}

export default NavBar