import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom';
import './auth.css'
const Register = () => {
  const[username ,setUserName] = useState("");
  const[email ,setemail] = useState("");
  const[password ,setPassword] = useState("");
  const[cnfPassword ,setCnfPassword] = useState("");
  const navigate = useNavigate();
  const handleValidation = (input) =>{
    if (input.username === ''){
      alert('Username cannot be empty!')
      return false;
    }
    if (input.email === ''){
      alert('Email cannot be empty!')
      return false;
    }
    if(!(/\S+@\S+\.\S+/.test(input.email))){
      alert('Email is Invalid!')
      return false;
    }
    if (input.password === ''){
      alert('Password cannot be empty!')
      return false;
    }
    // add validation for password
    if(input.password !== input.cnfPassword){
      alert('Password does not match')
      return false;
    }
    return true;
  }

  const registerUser = async (e)=>{
    e.preventDefault();
    const input = {username,email,password,cnfPassword}
    if(!handleValidation(input)){
      return;
    }
    delete input.cnfPassword
    const url = `http://localhost:8080/api/v1/auth/register`;   //change end point of api
    const response = await fetch(url,{
      method:"POST",
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
      },
      body:JSON.stringify(input)
    })
    const data = await response.json();
        /** can send response as {
     *   status : boolean
     *   msg : error msg if error else success msg
     * } 
     * 
     * **/
    // const data = {
    //   status : true,
    //   msg : 'Account Created Successfully'
    // }
    if (!data.status){
      alert(data.msg)
    }else{
      alert('account created');
      navigate("/login");
    }
  }
  return (
    <div className='login-main-container'>
    <h1>Logo</h1>
    <p>Create new account</p>
    <div className='login-container'>
        <form method="post">
            <input onChange={(e)=>setUserName(e.target.value)} type="text" name="username" id="username" placeholder='Enter Username' required={true}/>
            <input onChange={(e)=>setemail(e.target.value)} type="email" name="mailid" id="mailid" placeholder='Email id' required={true}/>
            <input  onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Password' required={true}/>
            <input  onChange={(e)=>setCnfPassword(e.target.value)} type="password" name="password" id="cnfpassword" placeholder='Confirm Password' required={true}/>

            <button className='signup-btn' onClick={registerUser}>Sign Up</button>
        </form>
         <Link className='signup-link' to="/login">Click here to Sign in</Link>

    </div>

</div>
  )
}

export default Register