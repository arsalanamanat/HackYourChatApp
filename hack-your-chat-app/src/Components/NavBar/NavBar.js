import './navbar.css';
import { useAuth } from '../../Context/AuthContext';
import { useSocket } from '../../Context/SocketContext';
import { useProfileImage } from '../../Context/ProfileImageContext';
import { useHistory, Link } from 'react-router-dom';

const NavBar = () => {
   const { currentUser, logout } = useAuth();
   const { profileImage } = useProfileImage();
   const { socket } = useSocket();

   const history = useHistory();

   const handleLogout = async (e) => {
      e.preventDefault();

      try {
         socket.emit('userLeft', { currentUser });
         await logout();
         history.push('/');
      } catch (err) {
         console.log(err.message);
      }
   };

   return (
      <div className=" navBar">
         <div className="logo">
            <Link to="/" className="logoLink">
               {' '}
               <h1 className="logo">HackYourChat</h1>{' '}
            </Link>
         </div>

         <div className="sideNavbar">
            <div>{currentUser ? <p className="activeEmail">{currentUser.email}</p> : ''}</div>
            <div>{currentUser && <img src={profileImage} className="navProfileImage" alt="profileImage" />}</div>
            {currentUser ? (
               <button className="logBtn" onClick={handleLogout}>
                  Logout
               </button>
            ) : (
               <button className="logBtn" onClick={() => history.push('/signup')}>
                  {' '}
                  Signup{' '}
               </button>
            )}
         </div>
      </div>
   );
};

export default NavBar;
