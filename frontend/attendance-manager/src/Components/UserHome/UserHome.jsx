import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"

export default function UserHome(){
    const navigate = useNavigate()
    const [isloading,setIsLoading] = useState(true)
    const [user,setUser] = useState(null)
    const [subjects,setSubjects]=useState(null)
    const url = "http://localhost:8080/api/v1/students"

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
            console.log(userData)
            return userData
    }

    async function loadSubjects(){
        const url = "http://localhost:8080/api/v1/students/subjects"
        const token = localStorage.getItem('token')
        const subjects = await fetch(url,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${token}`,
                'Content-type': 'application/json',
                "Accept":"application/json",
              }
        })

        return await subjects.json()
    }

    useEffect(()=>{
        const userDetails = loadUserDetails()
        userDetails.then((data)=>setUser(data))
    },[])

    useEffect(()=>{
        const subjectDetails = loadSubjects()
        subjectDetails.then((data)=>setSubjects(data))
    },[])

    return <>
    <WindowPane userDetails={user} subjectDetails={subjects}/>
    </>

}

function WindowPane({userDetails,subjectDetails}){
    return <>
    <div className="subjects-pane">
        {subjectDetails.map}
    </div>
    </>
}

function Subject({subject}){
    return <>
    <div className="subject-container">
        <div className="subject-block">
            <button>decrease</button>
            {subject}
            <button>increase</button>
        </div>
    </div>
    </>
}