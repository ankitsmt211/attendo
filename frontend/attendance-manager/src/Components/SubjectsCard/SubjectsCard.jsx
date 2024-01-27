import { useRef, useContext } from 'react';
import '../SubjectsCard/SubjectsCard.css';
import { currentSubjectContext } from '../Dashboard/Dashboard';
import PropTypes from 'prop-types';

export default function SubjectsCard({ subjectList, setSubjects }) {
  const addSubjectRef = useRef();
  const handleAddSubject = async () => {
    let subjectToAdd = {
      name: addSubjectRef.current.value,
      attendedClasses: 0,
      totalClasses: 0,
    };

    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/api/v1/students/subjects';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(subjectToAdd),
    });

    if (response.ok) {
      subjectToAdd = await response.json();
      const modifiedSubjects = [...subjectList, subjectToAdd];
      setSubjects(modifiedSubjects);
      addSubjectRef.current.value = '';
    } else {
      alert('was unable to add subject, please retry');
    }
  };

  return (
    <>
      <div className="subject-list">
        {subjectList.map((subject) => {
          return (
            <Subject subjectDetails={subject} setSubjects={setSubjects} subjectList={subjectList} key={subject.subId} />
          );
        })}
        <div className="new-subject-container">
          <input type="text" ref={addSubjectRef} className="new-subject-input" />
          <button className="add-subject-button" onClick={handleAddSubject}>
            add
          </button>
        </div>
      </div>
    </>
  );
}

SubjectsCard.propTypes = {
  subjectList: PropTypes.array,
  setSubjects: PropTypes.func,
};

function Subject({ subjectDetails, setSubjects, subjectList }) {
  const [, setCurrentSubject] = useContext(currentSubjectContext);

  const handleCurrentSubject = (e) => {
    console.log(e.target.innerText.toLowerCase());
    let currentSubjectName = e.target.innerText.toLowerCase();

    subjectList.forEach((sub) => {
      if (sub.name === currentSubjectName) {
        setCurrentSubject(sub);
      }
    });
  };

  return (
    <>
      <div className="subject-block">
        <div className="subject-with-attendance">
          <div className="subject-name" onClick={(e) => handleCurrentSubject(e)}>
            {subjectDetails.name}
          </div>
          <div className="subject-attendance-percent">
            {subjectDetails.totalClasses > 0
              ? Math.floor((subjectDetails.attendedClasses / subjectDetails.totalClasses) * 100)
              : 0}
          </div>
        </div>
      </div>
    </>
  );
}

Subject.propTypes = {
  subjectDetails: PropTypes.object,
  setSubjects: PropTypes.func,
  subjectList: PropTypes.array,
};
