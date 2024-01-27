import UserCard from '../UserCard/UserCard';
import SubjectsCard from '../SubjectsCard/SubjectsCard';
import SubjectInfo from '../SubjectInfo/SubjectInfo';
import '../Dashboard/Dashboard.css';
import { useEffect, useState, createContext } from 'react';
import '../ConfirmationModal/ConfirmAction';
import ConfirmAction from '../ConfirmationModal/ConfirmAction';
import { loadSubjects, loadUser, deleteSubject, logout } from '../../api/api';

export const currentSubjectContext = createContext();

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const deleteConfirmation = {
    name: 'delete',
    modalTitle: 'Confirm Delete ?',
    modalText: ' You are about to delete current subject, please confirm.',
    primaryButton: 'Delete',
    secondaryButton: 'Cancel',
    action: () => deleteSubject(currentSubject, setCurrentSubject, setSubjects),
  };

  const logoutConfirmation = {
    name: 'logout',
    modalTitle: 'Confirm Logout ?',
    modalText: 'You are about to logout, please confirm.',
    primaryButton: 'Logout',
    secondaryButton: 'Cancel',
    action: () => logout(),
  };

  useEffect(() => {
    const subjectDetails = loadSubjects();
    subjectDetails.then((data) => setSubjects(data));
  }, []);

  useEffect(() => {
    const user = loadUser();
    user.then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <currentSubjectContext.Provider value={[currentSubject, setCurrentSubject]}>
        <div className="base-container">
          {showDeleteModal && (
            <ConfirmAction
              status={showDeleteModal}
              setStatus={setShowDeleteModal}
              actionConfirmation={deleteConfirmation}
            />
          )}
          <h1 className="application-name">{'attendo'}</h1>
          <div className="dashboard-user">
            <div className="">
              {showLogoutModal && (
                <ConfirmAction
                  status={showLogoutModal}
                  setStatus={setShowLogoutModal}
                  actionConfirmation={logoutConfirmation}
                />
              )}
              {!isLoading && (
                <UserCard userDetails={user} noOfSubjects={subjects.length} setShowLogoutModal={setShowLogoutModal} />
              )}
            </div>
            <div className="subjects-container">
              <SubjectsCard subjectList={subjects} setSubjects={setSubjects} />
              <SubjectInfo subjectList={subjects} setSubjects={setSubjects} setShowDeleteModal={setShowDeleteModal} />
            </div>
          </div>
        </div>
      </currentSubjectContext.Provider>
    </>
  );
}
