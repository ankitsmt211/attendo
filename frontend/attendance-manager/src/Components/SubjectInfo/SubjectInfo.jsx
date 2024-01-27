import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import '../ConfirmationModal/ConfirmAction';
import { currentSubjectContext } from '../Dashboard/Dashboard';

import '../SubjectInfo/SubjectInfo.css';
export default function SubjectInfo({ subjectList, setSubjects, setShowDeleteModal }) {
  return (
    <>
      {
        <div className="subject-info">
          <ActiveSubject subjectList={subjectList} setSubjects={setSubjects} setShowDeleteModal={setShowDeleteModal} />
        </div>
      }
    </>
  );
}

function ActiveSubject({ subjectList, setSubjects, setShowDeleteModal }) {
  const [currentSubject, setCurrentSubject] = useContext(currentSubjectContext);

  useEffect(() => {
    console.log('curr sub changed');
    return () => console.log('cleanup');
  }, [currentSubject]);

  // const handleAbsent = () => {
  //     //increment total classes only
  //     const modifiedArrayOfSubjects = []

  //     for(let sub of subjectList){
  //         if(sub.name===currentSubject.name){
  //             modifiedArrayOfSubjects.push({...sub,totalClasses:sub.totalClasses+1})
  //             setCurrentSubject({...sub,totalClasses:sub.totalClasses+1})
  //         }
  //         else{
  //             modifiedArrayOfSubjects.push({...sub})
  //         }
  //     }

  //     setSubjects([...modifiedArrayOfSubjects]);
  // }

  const handleAbsent = async () => {
    // Find the current subject in the list
    const currentSubjectInList = subjectList.find((sub) => sub.name === currentSubject.name);

    // Send a PUT request to the backend API to update the subject
    const url = 'http://localhost:8080/api/v1/students/subjects/is-absent';
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(currentSubjectInList.subId),
    });

    // If the request was successful, update the client state
    if (response.ok) {
      const updatedSubjectFromServer = await response.json();

      // Create a new array with the updated subject
      const modifiedArrayOfSubjects = subjectList.map((sub) =>
        sub.name === currentSubject.name ? updatedSubjectFromServer : sub
      );

      // Update the state
      setSubjects(modifiedArrayOfSubjects);
      setCurrentSubject(updatedSubjectFromServer);
    }
  };

  // const handlePresent = () =>{
  //     //increment both attended and total

  //     const modifiedArrayOfSubjects = []
  //     for(let sub of subjectList){
  //         if(sub.name===currentSubject.name){
  //             modifiedArrayOfSubjects.push({...sub,attendedClasses:sub.attendedClasses+1,totalClasses:sub.totalClasses+1})
  //             setCurrentSubject({...sub,attendedClasses:sub.attendedClasses+1,totalClasses:sub.totalClasses+1})
  //         }
  //         else{
  //             modifiedArrayOfSubjects.push(sub)
  //         }
  //     }

  //     setSubjects(modifiedArrayOfSubjects)
  // }

  const handlePresent = async () => {
    // Find the current subject in the list
    const currentSubjectInList = subjectList.find((sub) => sub.name === currentSubject.name);

    // Send a PUT request to the backend API to update the subject
    const url = 'http://localhost:8080/api/v1/students/subjects/is-present';
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(currentSubjectInList.subId),
    });

    // If the request was successful, update the client state
    if (response.ok) {
      const updatedSubjectFromServer = await response.json();

      // Create a new array with the updated subject
      const modifiedArrayOfSubjects = subjectList.map((sub) =>
        sub.name === currentSubject.name ? updatedSubjectFromServer : sub
      );

      // Update the state
      setSubjects(modifiedArrayOfSubjects);
      setCurrentSubject(updatedSubjectFromServer);
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal((prev) => !prev);
    // const token = localStorage.getItem('token')
    // const url = `http://localhost:8080/api/v1/students/subjects/${currentSubject.subId}`

    // console.log(url,'urlhere')
    // const response = await fetch(url, {
    //     method: 'DELETE',
    //     headers: {
    //         "Authorization": `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //         "Accept":"application/json"
    //     }
    // })

    // if(response.ok){
    //     const updatedSubjects = await response.json()

    //     setSubjects(updatedSubjects)
    // }
  };

  return (
    <>
      <div className="current-subject-container">
        {Object.keys(currentSubject).map((key) => {
          return <div className="subject-field">{`${key} : ${currentSubject[`${key}`]}`}</div>;
        })}
      </div>

      {Object.keys(currentSubject).length > 0 ? (
        <div className="attendance-buttons-container">
          <button className="absent-button" onClick={handleAbsent}>
            Absent
          </button>
          <FontAwesomeIcon icon={faTrash} size="2x" color="#455A52" onClick={handleDelete} />
          <button className="present-button" onClick={handlePresent}>
            Present
          </button>
        </div>
      ) : (
        <p className="info-no-subjects">add subject to see details</p>
      )}
    </>
  );
}
