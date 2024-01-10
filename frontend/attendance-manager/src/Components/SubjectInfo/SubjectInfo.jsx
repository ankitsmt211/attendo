import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState } from 'react'
import '../SubjectInfo/SubjectInfo.css'
export default function SubjectInfo({currentSubject,subjectList,setSubjects}){
    return <>
    {
        <div className="subject-info">
             {subjectList.map(sub=>{
            if(sub.name==currentSubject){
                return <ActiveSubject currentSubject={currentSubject} subjectList={subjectList} setSubjects={setSubjects}/>
            }
        })}
        </div>
    }
    </>
}

function ActiveSubject({currentSubject,subjectList,setSubjects}){
    const [currentSubjectObj, setCurrentSubjectObj] = useState(subjectList[0]);

    useEffect(()=>{
        const currentSubjectIndex = subjectList.findIndex(sub => sub.name === currentSubject)
        setCurrentSubjectObj(subjectList[currentSubjectIndex])
    },[currentSubject,subjectList])


    const handleAbsent = ()=>{
        //increment total classes only
        
        const modifiedArrayOfSubjects = []
        for(let sub of subjectList){
            if(sub.name===currentSubject){
                modifiedArrayOfSubjects.push({...sub,totalClasses:sub.totalClasses+1})
            }
            else{
                modifiedArrayOfSubjects.push(sub)
            }
        }

        setSubjects(modifiedArrayOfSubjects)
    }

    const handlePresent = () =>{
        //increment both attended and total

        const modifiedArrayOfSubjects = []
        for(let sub of subjectList){
            if(sub.name===currentSubject){
                modifiedArrayOfSubjects.push({...sub,attendedClasses:sub.attendedClasses+1,totalClasses:sub.totalClasses+1})
            }
            else{
                modifiedArrayOfSubjects.push(sub)
            }
        }

        setSubjects(modifiedArrayOfSubjects)
    }

    
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
                <button className='absent-button' onClick={handleAbsent}>Absent</button>
                <FontAwesomeIcon icon={faTrash}  size='2x' color='#455A52'/>
                <button className='present-button' onClick={handlePresent}>Present</button>
            </div>
            </>
        );
    
}