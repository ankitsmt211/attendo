import { useRef } from 'react'
import '../SubjectsCard/SubjectsCard.css'
export default function SubjectsCard({setCurrentSubject,subjectList,setSubjects}){

    const addSubjectRef = useRef()
    const handleAddSubject = ()=>{
        const subjectToAdd = {
            name:addSubjectRef.current.value,
            attendedClasses:0,
            totalClasses:0
        }

        const modifiedSubjects = [...subjectList,subjectToAdd]
        setSubjects(modifiedSubjects)
    }

    return <>
    <div className="subject-list">
        {
            subjectList.map(subject=>{
                return <Subject subjectDetails={subject} setCurrentSubject={setCurrentSubject} setSubjects={setSubjects} subjectList={subjectList}/>
            })
        }
        <div className='new-subject-container'>
            <input type='text' ref={addSubjectRef} className='new-subject-input'/>
            <button className='add-subject-button' onClick={handleAddSubject}>add</button>
        </div>
    </div>
    </>
}

function Subject({subjectDetails,setCurrentSubject,setSubjects,subjectList}){
    const handleCurrentSubject = (e)=>{
        console.log(e.target.innerText.toLowerCase())
        setCurrentSubject(e.target.innerText.toLowerCase())
    }

    const handleIncrement = ()=>{
        const modifiedSubjects =  subjectList.map(sub=>{
            if(sub.name==subjectDetails.name){
               
                return {
                    ...sub,
                    attendedClasses: sub.attendedClasses+1,
                    totalClasses: sub.totalClasses+1
                }
            }
            else{
                return sub
            }
        })
        setSubjects(modifiedSubjects)
    }

    const handleDecrement = ()=>{
        const modifiedSubjects = subjectList.map(sub=>{
            if(sub.name==subjectDetails.name){
                
                return {
                    ...sub,
                    totalClasses:sub.totalClasses+1
                }
            }
            else{
                return sub
            }
        })

        setSubjects(modifiedSubjects)
    }

    return<>
      <div className='subject-block'>
         <button type='button' className='decrement-attendance-button' onClick={handleDecrement}>{'<'}</button>
         <div className='subject-with-attendance'>
            <div className='subject-name' onClick={e=>handleCurrentSubject(e)}>{subjectDetails.name}</div>
            <div className='subject-attendance-percent'>{Math.floor((subjectDetails.attendedClasses/subjectDetails.totalClasses)*100)}</div>
         </div>
         <button type='button' className='increment-attendance-button' onClick={handleIncrement}>{'>'}</button>
    </div>
    </>
}