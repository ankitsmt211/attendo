import '../UserCard/UserCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'

export default function UserCard(){
    return <>
    <div>
        <div className="user-container">
            <UserAvatarWithName/> 
            <UserInfo/>
        </div>
    </div>
    </>
}

function UserAvatarWithName(){
    return <>
    <div className="user-avatar-with-name">
        <div className='user-avatar'>
            <FontAwesomeIcon icon={faUserTie} size='7x' />
        </div>
    <div className='user-name'>
        {"John Doe"}
    </div>
    </div>
    </>
}

function UserInfo(){
    return <>
    <div className='user-info-container'>
        <div>
            {'email: johndoe@xyz.com'}
        </div>
        <div>
            {'no of subjects: 4'}
        </div>
        <div>
            {'school: ABC school of Engineering'}
        </div>
    </div>
    </>
}