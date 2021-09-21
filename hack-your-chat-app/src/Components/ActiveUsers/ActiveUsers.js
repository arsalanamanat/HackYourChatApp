import React from 'react';

const ActiveUsers = ({ roomUsers }) => {
   return (
      <>
         {roomUsers.map((roomUser) => (
            <div className="activeUsersDiv" key={roomUser.id}>
               <img src={roomUser.profileImage} className="activeUsersProfileImage" alt={`ProfileImage-${roomUser.username}`} />
               <div className="activeColor"></div>
               <p className="RoomUserName">{roomUser.username}</p>
            </div>
         ))}
      </>
   );
};

export default ActiveUsers;
