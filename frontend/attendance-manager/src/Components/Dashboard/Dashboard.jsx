import UserCard from "../UserCard/UserCard"
import SubjectsCard from "../SubjectsCard/SubjectsCard"
import SubjectInfo from "../SubjectInfo/SubjectInfo"
import '../Dashboard/Dashboard.css'
import { useEffect, useState, createContext } from "react"
import '../ConfirmationModal/ConfirmAction'
import ConfirmAction from "../ConfirmationModal/ConfirmAction"



export const currentSubjectContext = createContext()

export default function Dashboard(){
    async function loadSubjects(){
        const url = "http://localhost:8080/api/v1/students/subjects"
        const token = localStorage.getItem('token')
        const subjects = await fetch(url,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Accept":"application/json",
              }
        })

        return await subjects.json()
    }

    async function loadUser(){
        const token = localStorage.getItem('token')
        const url = 'http://localhost:8080/api/v1/students'

        const user = await fetch(url,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Accept":"application/json"
            }
        })

        if(user.ok){
            return user.json()
        }
        else{
            console.error(`Error:${user.status}`)
        }
    }

    const [user,setUser] = useState(null)
    const [subjects,setSubjects] = useState([])
    const [currentSubject,setCurrentSubject] = useState({})
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    const deletion = async () => {
        const token = localStorage.getItem('token')
        const url = `http://localhost:8080/api/v1/students/subjects/${currentSubject.subId}`
    
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Accept":"application/json"
            }
        })
    
        if(response.ok){
            const updatedSubjects = await response.json()
            setSubjects(updatedSubjects)
            if(updatedSubjects.length>0){
              setCurrentSubject(updatedSubjects[0])
            }
            else{
              setCurrentSubject('')
            }
            return true; 
        }
        return false; 
      }

    const deleteConfirmation = {
        name:'delete',
        modalTitle:'Confirm Delete ?',
        modalText:' You are about to delete current subject, please confirm.',
        primaryButton:'Delete',
        secondaryButton:'Cancel',
        action: deletion
    }


    useEffect(()=>{
        const subjectDetails = loadSubjects()
        subjectDetails.then((data)=>setSubjects(data))
    },[])

    useEffect(()=>{
        const user = loadUser()
        user.then(data=>{
            setUser(data)
            setIsLoading(false)
        })
    },[])

    // console.log(user)
    return <>
    <currentSubjectContext.Provider value={[currentSubject,setCurrentSubject]}>
    <div className="base-container">
        {showDeleteModal && <ConfirmAction status={showDeleteModal} setStatus={setShowDeleteModal} actionConfirmation={deleteConfirmation} />}
        <h1 className="application-name">{'attendo'}</h1>
        <div className="dashboard-user">
            <div className="">
                {!isLoading && <UserCard userDetails={user} noOfSubjects={subjects.length}/>}
            </div>
            <div className="subjects-container">
                <SubjectsCard subjectList={subjects} setSubjects={setSubjects}/>
                <SubjectInfo  subjectList={subjects} setSubjects={setSubjects} setShowDeleteModal={setShowDeleteModal} />
            </div>
        </div>
    </div>
    </currentSubjectContext.Provider>
    </>
}