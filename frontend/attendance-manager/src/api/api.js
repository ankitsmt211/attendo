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

const deleteSubject = async (currentSubject,setCurrentSubject,setSubjects) => {
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

export {loadSubjects,loadUser,deleteSubject}