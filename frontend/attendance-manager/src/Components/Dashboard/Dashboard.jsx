import UserCard from "../UserCard/UserCard"
import SubjectsCard from "../SubjectsCard/SubjectsCard"
import SubjectInfo from "../SubjectInfo/SubjectInfo"
import '../Dashboard/Dashboard.css'
import { useEffect, useState } from "react"

export default function Dashboard(){
    const subjectList = [
        {name:'maths',attendedClasses:10,totalClasses:12},
        {name:'english',attendedClasses:3,totalClasses:4},
        {name:'science',attendedClasses:7,totalClasses:13},
        {name:'computer',attendedClasses:6,totalClasses:12}
    ]

    const [subjects,setSubjects] = useState(subjectList)
    const [currentSubject,setCurrentSubject] = useState('')
  

    return <>
    <div className="base-container">
        <h1 className="application-name">{'attendo'}</h1>
        <div className="">
            <UserCard/>
        </div>
        <div className="subjects-container">
            <SubjectsCard setCurrentSubject={setCurrentSubject} subjectList={subjects} setSubjects={setSubjects}/>
            <SubjectInfo currentSubject={currentSubject} subjectList={subjects}/>
        </div>
    </div>
    </>
}