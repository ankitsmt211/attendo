import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect,useState } from 'react'
import '../ConfirmationModal/ConfirmDelete'
import {currentSubjectContext} from '../Dashboard/Dashboard'

import '../SubjectInfo/SubjectInfo.css'
export default function SubjectInfo({subjectList,setSubjects,setShowDeleteModal,deleteCurrentSubject,setDeleteCurrentSubject}){
    return <>
    {
        <div className="subject-info">
            <ActiveSubject subjectList={subjectList} setSubjects={setSubjects} setShowDeleteModal={setShowDeleteModal} deleteCurrentSubject={deleteCurrentSubject} setDeleteCurrentSubject={setDeleteCurrentSubject}/>
        </div>
    }
    </>
}

function ActiveSubject({subjectList,setSubjects,setShowDeleteModal,deleteCurrentSubject,setDeleteCurrentSubject}){
    const [currentSubject,setCurrentSubject] = useContext(currentSubjectContext)

    const handleAbsent = () => {
        //increment total classes only
        const modifiedArrayOfSubjects = [] 

        for(let sub of subjectList){
            if(sub.name===currentSubject.name){
                modifiedArrayOfSubjects.push({...sub,totalClasses:sub.totalClasses+1})
                setCurrentSubject({...sub,totalClasses:sub.totalClasses+1})
            }
            else{
                modifiedArrayOfSubjects.push({...sub})
            }
        }
    
        setSubjects([...modifiedArrayOfSubjects]);
    }

    const handlePresent = () =>{
        //increment both attended and total

        const modifiedArrayOfSubjects = []
        for(let sub of subjectList){
            if(sub.name===currentSubject.name){
                modifiedArrayOfSubjects.push({...sub,attendedClasses:sub.attendedClasses+1,totalClasses:sub.totalClasses+1})
                setCurrentSubject({...sub,attendedClasses:sub.attendedClasses+1,totalClasses:sub.totalClasses+1})
            }
            else{
                modifiedArrayOfSubjects.push(sub)
            }
        }

        setSubjects(modifiedArrayOfSubjects)
    }

    const handleDelete = () => {
        setShowDeleteModal(prev=>!prev)
        console.log(deleteCurrentSubject)
        if(deleteCurrentSubject){
            {console.log("perform delete")}
            const modifiedArrayOfSubjects = []
            for(let sub of subjectList){
                if(sub.name!==currentSubject){
                    modifiedArrayOfSubjects.push(sub)
                }
            }

            setSubjects(modifiedArrayOfSubjects)
            setDeleteCurrentSubject(prev=>!prev)
        }
    }

        return (
            <>
            <div className='current-subject-container'>
                {
                    Object.keys(currentSubject).map((key)=>{
                        return <div className='subject-field'>{`${key} : ${currentSubject[`${key}`]}`}</div>
                    })
                }
            </div>
        
            <div className='attendance-buttons-container'>
                <button className='absent-button' onClick={handleAbsent}>Absent</button>
                <FontAwesomeIcon icon={faTrash}  size='2x' color='#455A52' onClick={handleDelete}/>
                <button className='present-button' onClick={handlePresent}>Present</button>
            </div>
            </>
        );
    
}