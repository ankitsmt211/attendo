import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import '../ConfirmationModal/ConfirmAction';
import { currentSubjectContext } from '../Dashboard/Dashboard';
import PropTypes from 'prop-types';

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

//adding prop types to fix eslint issues
SubjectInfo.propTypes = {
  subjectList: PropTypes.array,
  setSubjects: PropTypes.func,
  setShowDeleteModal: PropTypes.func,
};

function ActiveSubject({ subjectList, setSubjects, setShowDeleteModal }) {
  const [currentSubject, setCurrentSubject] = useContext(currentSubjectContext);

  useEffect(() => {
    console.log('curr sub changed');
    return () => console.log('cleanup');
  }, [currentSubject]);

  ActiveSubject.propTypes = {
    subjectList: PropTypes.array,
    setSubjects: PropTypes.func,
    setShowDeleteModal: PropTypes.func,
  };

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
