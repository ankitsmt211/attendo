import { useRef,useContext } from 'react'
import '../SubjectsCard/SubjectsCard.css'
import { currentSubjectContext } from '../Dashboard/Dashboard'

export default function SubjectsCard({subjectList,setSubjects}){



    const addSubjectRef = useRef()
    const handleAddSubject = ()=>{
        const subjectToAdd = {
            name:addSubjectRef.current.value,
            attendedClasses:0,
            totalClasses:0
        }

        const modifiedSubjects = [...subjectList,subjectToAdd]
        setSubjects(modifiedSubjects)
        addSubjectRef.current.value=""
    }

    return <>
    <div className="subject-list">
        {
            subjectList.map(subject=>{
                return <Subject subjectDetails={subject} setSubjects={setSubjects} subjectList={subjectList}/>
            })
        }
        <div className='new-subject-container'>
            <input type='text' ref={addSubjectRef} className='new-subject-input'/>
            <button className='add-subject-button' onClick={handleAddSubject}>add</button>
        </div>
    </div>
    </>
}

function Subject({subjectDetails,setSubjects,subjectList}){

    const [currentSubject,setCurrentSubject] = useContext(currentSubjectContext)
    
    const handleCurrentSubject = (e)=>{
        console.log(e.target.innerText.toLowerCase())
        let currentSubjectName = e.target.innerText.toLowerCase()

        subjectList.map(sub=>{
            if(sub.name===currentSubjectName){
                setCurrentSubject(sub)
            }
        })
    }

    return<>
      <div className='subject-block'>
         {/* <div className='subject-with-attendance'>
            <div className='subject-name' onClick={e=>handleCurrentSubject(e)}>{subjectDetails.name}</div>
            <div className='subject-attendance-percent'>{Math.floor((subjectDetails.attendedClasses/subjectDetails.totalClasses)*100)}</div>
         </div> */}
         <div className='subject-with-attendance'>
            <div className='subject-name' onClick={e=>handleCurrentSubject(e)}>{subjectDetails.name}</div>
            <div className='subject-attendance-percent'>
            {subjectDetails.totalClasses > 0 ? Math.floor((subjectDetails.attendedClasses/subjectDetails.totalClasses)*100) : 0}
            </div>
         </div>

      </div>
    </>
}