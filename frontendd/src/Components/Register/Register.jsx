import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React, { useRef } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import "./Register.css"
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const userRegisterSuccess = () =>{
    toast.success("Registered Successfully!")
}

const userRegisterFail = () =>{
    toast.error("Failed to Register!")
}
const Register = ({setShowRegister}) => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const handleSubmit = async(e) => {
        e.preventDefault()

        const newUser = {
            userName : nameRef.current.value,
            email : emailRef.current.value,
            password : passRef.current.value
        }

        try{
            const res = await axios.post("/users/register",newUser)
            console.log(res)
            setShowRegister(false)
            userRegisterSuccess();
        }catch(err)
        {
            console.log(err)
            userRegisterFail();
        }
    }
  return (
    <div className="register_container">
      <div className="logo">
        <ExitToAppIcon/>Create a profile
      </div>
      <form on onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef}/>
        <input type="email" placeholder="E-mail" ref={emailRef}/>
        <input type="password" placeholder="Password" ref={passRef}/>
        <button className="register_btn">Register</button>
      </form>
      <CancelIcon className="register_cancel" onClick={() => setShowRegister(false)}/>
    </div>
  );
};

export default Register;
