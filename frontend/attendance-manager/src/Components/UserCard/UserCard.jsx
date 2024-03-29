import '../UserCard/UserCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function UserCard({ userDetails, noOfSubjects, setShowLogoutModal }) {
  console.log(userDetails);
  return (
    <>
      <div>
        <div className="user-container">
          <UserAvatarWithName userDetails={userDetails} />
          <UserInfo userDetails={userDetails} noOfSubjects={noOfSubjects} setShowLogoutModal={setShowLogoutModal} />
        </div>
      </div>
    </>
  );
}

UserCard.propTypes = {
  userDetails: PropTypes.object,
  noOfSubjects: PropTypes.number,
  setShowLogoutModal: PropTypes.func,
};

function UserAvatarWithName({ userDetails }) {
  return (
    <>
      <div className="user-avatar-with-name">
        <div className="user-avatar">
          <FontAwesomeIcon icon={faUserTie} size="7x" />
        </div>
        <div className="user-name">{`${userDetails.name}`}</div>
      </div>
    </>
  );
}

UserAvatarWithName.propTypes = {
  userDetails: PropTypes.object,
};

function UserInfo({ userDetails, noOfSubjects, setShowLogoutModal }) {
  const handleLogout = () => {
    setShowLogoutModal((prev) => !prev);
  };
  return (
    <>
      <div className="user-info-container">
        <div>{`email: ${userDetails.email}`}</div>
        <div>{`no of subjects: ${noOfSubjects}`}</div>
        <div>{'school: ABC school of Engineering'}</div>
      </div>
      <div className="logout-button-container">
        <FontAwesomeIcon icon={faRightFromBracket} size="2x" onClick={handleLogout} />
      </div>
    </>
  );
}

UserInfo.propTypes = {
  userDetails: PropTypes.object,
  noOfSubjects: PropTypes.number,
  setShowLogoutModal: PropTypes.func,
};
