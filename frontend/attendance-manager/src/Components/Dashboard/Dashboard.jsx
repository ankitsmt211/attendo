import UserCard from "../UserCard/UserCard"
import SubjectsCard from "../SubjectsCard/SubjectsCard"
import SubjectInfo from "../SubjectInfo/SubjectInfo"
import '../Dashboard/Dashboard.css'
import { useEffect, useState, createContext } from "react"
import '../ConfirmationModal/ConfirmDelete'
import ConfirmDelete from "../ConfirmationModal/ConfirmDelete"



export const currentSubjectContext = createContext()

export default function Dashboard(){
    const subjectList = [
        {name:'maths',attendedClasses:10,totalClasses:12},
        {name:'english',attendedClasses:3,totalClasses:4},
        {name:'science',attendedClasses:7,totalClasses:13},
        {name:'computer',attendedClasses:6,totalClasses:12}
    ]

    const [subjects,setSubjects] = useState(subjectList)
    const [currentSubject,setCurrentSubject] = useState(subjectList[0])
    const [showDeleteModal,setShowDeleteModal] = useState(false)

    

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