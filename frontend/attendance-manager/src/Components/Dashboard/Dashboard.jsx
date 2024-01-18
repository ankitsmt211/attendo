import UserCard from "../UserCard/UserCard"
import SubjectsCard from "../SubjectsCard/SubjectsCard"
import SubjectInfo from "../SubjectInfo/SubjectInfo"
import '../Dashboard/Dashboard.css'
import { useEffect, useState, createContext } from "react"
import '../ConfirmationModal/ConfirmDelete'
import ConfirmDelete from "../ConfirmationModal/ConfirmDelete"



export const currentSubjectContext = createContext()

export default function Dashboard(){

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

    const [subjects,setSubjects] = useState([])
    const [currentSubject,setCurrentSubject] = useState({})
    const [showDeleteModal,setShowDeleteModal] = useState(false)


    useEffect(()=>{
        const subjectDetails = loadSubjects()
        subjectDetails.then((data)=>setSubjects(data))
    },[])
    

    return <>
    <currentSubjectContext.Provider value={[currentSubject,setCurrentSubject]}>
    <div className="base-container">
        {showDeleteModal && <ConfirmDelete status={showDeleteModal} setStatus={setShowDeleteModal}  subjects={subjects} setSubjects={setSubjects} />}
        <h1 className="application-name">{'attendo'}</h1>
        <div className="dashboard-user">
            <div className="">
                <UserCard/>
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