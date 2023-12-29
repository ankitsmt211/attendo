import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"

export default function UserHome(){
    const navigate = useNavigate()
    const [isloading,setIsLoading] = useState(true)
    const [user,setUser] = useState(null)
    const url = "http://localhost:8080/api/v1/students/get"

    async function loadUserDetails(){
            const token = localStorage.getItem('token')
            const user = await fetch(url,{
                method:'GET',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    'Content-type': 'application/json',
                    "Accept":"application/json",
                  }
            })

            const userData = await user.json();
            return userData
    }

    useEffect(()=>{
        const userDetails = loadUserDetails()
        setUser(userDetails)
    },[])

    return <>
    {JSON.stringify(user)}
    </>

}