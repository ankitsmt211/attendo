import '../SubjectInfo/SubjectInfo.css'
export default function SubjectInfo({currentSubject,subjectList}){
    return <>
    {
        <div className="subject-info">
             {subjectList.map(sub=>{
            if(sub.name==currentSubject){
                return JSON.stringify(sub)
            }
        })}
        </div>
    }
    </>
}