import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../Context/SocketContext';
import moment from 'moment';
import ActiveUsers from '../ActiveUsers/ActiveUsers';
import Messages from '../Messages/Messages';
import { useProfileImage } from '../../Context/ProfileImageContext';

import './chatroom.css';

const ChatRoom = () => {
   const time = moment().format('h:mm a');

   const [messages, setMessages] = useState([]);
   const [roomUsers, setRoomUsers] = useState([]);
   const { socket } = useSocket();
   const { profileImage } = useProfileImage();
   const { username, room } = useParams();

   const scrollRef = useRef(null);

   const messageRef = useRef('');

   const clickHandler = (e) => {
      e.preventDefault();
      socket.emit('chatMessage', messageRef.current.value);
      messageRef.current.value = '';
      messageRef.current.focus();
   };

   const scrollToBottom = () => {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   useEffect(() => {
      socket.connect();

      socket.emit('joinRoom', { username, room, profileImage });
      socket.on('message', (msg) => {
         setMessages((prevMsg) => [...prevMsg, msg]);
      });

      socket.on('roomUsers', ({ users }) => {
         const activeUsers = users.filter((user) => user.username !== username);
         setRoomUsers(activeUsers);
      });
   }, []);

   return (
      <div className="mainBody">
         <div className="activeUsersContainer">
            <h1> {room}</h1>
            <div className="profileImageContainer">
               <img src={profileImage} className="profileImage" alt="ProfileImage" />
               <h4>@{username}</h4>
            </div>
            <div className="roomUsers">{roomUsers[0] && <ActiveUsers roomUsers={roomUsers} />} </div>
         </div>
         <div className="chatContainer">
            <div className="chatArea">
               <Messages messages={messages} username={username} time={time} />
               <div ref={scrollRef}></div>
            </div>
            <div className="messageInputContainer">
               <input type="text" placeholder="Type message" className="messageField" ref={messageRef} />
               <button className="sendMessageBtn" onClick={clickHandler}>
                  Send
               </button>
            </div>
         </div>
      </div>
   );
};

export default ChatRoom;
