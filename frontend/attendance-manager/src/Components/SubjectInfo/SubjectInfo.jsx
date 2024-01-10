import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState } from 'react'
import '../SubjectInfo/SubjectInfo.css'
export default function SubjectInfo({currentSubject,subjectList}){
    return <>
    {
        <div className="subject-info">
             {subjectList.map(sub=>{
            if(sub.name==currentSubject){
                return <ActiveSubject currentSubject={currentSubject} subjectList={subjectList}/>
            }
        })}
        </div>
    }
    </>
}

function ActiveSubject({currentSubject,subjectList}){
    const [currentSubjectObj, setCurrentSubjectObj] = useState(subjectList[0]);

    useEffect(()=>{
        const currentSubjectIndex = subjectList.findIndex(sub => sub.name === currentSubject)
        setCurrentSubjectObj(subjectList[currentSubjectIndex])
    },[currentSubject,subjectList])

    
        const currentSubjectArr = Object.entries(currentSubjectObj)
        return (
            <>
            <div className='current-subject-container'>
                {
                    currentSubjectArr.map(([key, value])=>{
                        return <div className='subject-field'>{`${key}: ${value}`}</div>
                    })
                }
            </div>
        
            <div className='attendance-buttons-container'>
                <button className='absent-button'>Absent</button>
                <FontAwesomeIcon icon={faTrash}  size='2x' color='#455A52'/>
                <button className='present-button'>Present</button>
            </div>
            </>
        );
    
}