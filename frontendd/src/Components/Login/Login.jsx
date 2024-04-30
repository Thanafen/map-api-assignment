import "./Login.css"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef } from "react";
import { toast } from 'react-toastify';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';



const userRegisterSuccess = () => {
    toast.success("Login Successfully!")
  }
  
  const userRegisterFail = () => {
    toast.error("Login Failed!")
  }

export default function Login({setShowLogin,setCurrentUser})
{
    const nameRef = useRef()
    const passRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const newUser = {
            userName : nameRef.current.value,
            password : passRef.current.value
        }

        try{
            const res = await axios.post("/users/login",newUser)
            userRegisterSuccess()
            console.log(res)   
            setCurrentUser(res.data.userName)
            setShowLogin(false)
        }catch(err)
        {
            userRegisterFail()
        }
    }

    return(
        <div className="login_container">
            <div className="logo">
                <ExitToAppIcon />
                Login to your profile
            </div>
            <form onSubmit = {handleSubmit}>
                <input type = "text" placeholder="username" ref = {nameRef}/>
                <input type = "password" placeholder="password" ref = {passRef}/>
                <button className="login_btn" >Login</button>
            </form>
            <CancelIcon className="login_cancel" onClick={() => setShowLogin(false)}/>
        </div>
    )
}