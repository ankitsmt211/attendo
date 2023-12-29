import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './auth.css'

const Login = () => {

  const [email,setEmail] = useState()
  const [password,setPassword]=useState()
  const navigate = useNavigate()

  const handleToken=(token)=>{
    localStorage.setItem("token",token)
  }

  const handleLogin = async(e)=>{
    e.preventDefault()

    //change url for different endpoint
    const url = `http://localhost:8080/api/v1/auth/login`

    const user = {email,password}

    const response = await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
      },
      body:JSON.stringify(user)
    })

    const responseData = await response.json()

    
      if(responseData.status){
        const token = responseData.payload
        handleToken(token)
        navigate("/userhome")
      }
      if(!responseData.status){
        alert(responseData.message)
      }
    
  }

  return (
    <div className='login-main-container'>
    <h1>Logo</h1>
    <p>Login</p>
    <div className='login-container'>
        <form method="post">
            <input onChange={(e)=>setEmail(e.target.value)} type="email" name="mailid" id="mailid" placeholder='Email id' required={true}/>
            <input  onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Password' required={true}/>
            <button className='signup-btn' onClick={handleLogin}>Login</button>
        </form>
         <Link className='register-link' to="/register">Click here to register</Link>

    </div>

</div>
  )
}

export default Login