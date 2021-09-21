import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useProfileImage } from '../../Context/ProfileImageContext';
import './joinchat.css';

const JoinChat = () => {
   const usernameRef = useRef('');
   const roomRef = useRef('');
   const [error, setError] = useState();
   const [loading, setLoading] = useState(false);
   const { currentUser, uploadImage, downloadImage } = useAuth('');
   const { profileImage, setProfileImage } = useProfileImage();
   const history = useHistory();

   const imageHandler = async (e) => {
      const url = e.target.files[0];
      setLoading(true);
      await uploadImage(`/images/${currentUser.uid}/profileImage`, url);
      await downloadImage(`/images/${currentUser.uid}/profileImage`).then((url) => {
         setProfileImage(url);
      });

      setLoading(false);

      //   const reader = new FileReader();
      //   reader.onload = () => {
      //      const picUrl = reader.result;
      //      setProfileImage(picUrl);
      //   };
      //   reader.readAsDataURL(url);
   };

   const submitHandler = async (e) => {
      const username = usernameRef.current.value;
      const room = roomRef.current.value;

      e.preventDefault();
      if (username === '' || room === '') {
         setError('Please Provide Username and Select chat Room');
      }

      if (
         roomRef.current.value !== 'class-31' &&
         roomRef.current.value !== 'class-32' &&
         roomRef.current.value !== 'class-33' &&
         roomRef.current.value !== 'class-34' &&
         roomRef.current.value !== 'class-35'
      ) {
         setError('Please Select Correct Room');
      } else {
         history.push(`/chatroom/${username}/${room}`);
      }
   };

   return (
      <div className="joinRoomContainer">
         <div className="uploadImageContainer">
            <h3>Select Profile Image</h3>
            <div>
               <img className="profilePhoto" src={profileImage} alt="selectProfileImage" />
            </div>
            <form>
               <input type="file" name="image-upload" id="image" style={{ display: 'none' }} onChange={imageHandler} />
               <label htmlFor="image" className="uploadImageBtn">
                  +
               </label>
            </form>
            {loading && <p className="loading"> Loading..... </p>}
         </div>
         <div className="selectData">
            <h1> Join Chat! </h1>

            {error && <h2 className="errorNotification">{error}</h2>}
            <form onSubmit={submitHandler}>
               <input type="text" placeholder="Username" ref={usernameRef} className="joinChatInputField" /> <br />
               <input list="selectRooms" ref={roomRef} className="joinChatInputField" placeholder="Select Room to Join" />
               <datalist id="selectRooms">
                  <option value="class-31" />
                  <option value="class-32" />
                  <option value="class-33" />
                  <option value="class-34" />
                  <option value="class-35" />
               </datalist>
               <br />
               <button className="joinChat">Enter Chat Room!</button>
            </form>
         </div>
      </div>
   );
};

export default JoinChat;
