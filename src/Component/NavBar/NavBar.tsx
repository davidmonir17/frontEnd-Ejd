import React from 'react'
import "./NavBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch} from "../../store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/user";


const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const loghandler=()=>{
  localStorage.removeItem("userToken");

  dispatch(logout(null));
  navigate("/");

}

  return (
    <div className='navbarfom'>
    <div className="leftside">
        <Link to="/" style={{textDecoration:'none'}}>
             <span>David Task</span>
        </Link>
             <HomeOutlinedIcon/>
    </div>    
    <div className="rightside">
      <div onClick={loghandler}>
      <LogoutOutlinedIcon/>
      </div>
            <AccountCircleOutlinedIcon/>
        <div className="userform">
            <span>{user.Email}</span>
        </div>
        </div>    
    </div>
  )
}

export default NavBar