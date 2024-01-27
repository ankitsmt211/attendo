import '../UserCard/UserCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function UserCard({ userDetails, noOfSubjects }) {
  console.log(userDetails);
  return (
    <>
      <div>
        <div className="user-container">
          <UserAvatarWithName userDetails={userDetails} />
          <UserInfo userDetails={userDetails} noOfSubjects={noOfSubjects} />
        </div>
      </div>
    </>
  );
}

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

function UserInfo({ userDetails, noOfSubjects }) {
  return (
    <>
      <div className="user-info-container">
        <div>{`email: ${userDetails.email}`}</div>
        <div>{`no of subjects: ${noOfSubjects}`}</div>
        <div>{'school: ABC school of Engineering'}</div>
      </div>
    </>
  );
}
