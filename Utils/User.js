const moment = require('moment');

const users = [];

formatMessage = (username, text) => {
   return {
      username,
      text,
      time: moment().format('h:mm a'),
   };
};

const joinUser = (id, username, room, profileImage) => {
   const user = {
      id,
      username,
      room,
      profileImage,
   };
   users.push(user);

   return user;
};

const getCurrentUser = (id) => {
   return users.find((user) => user.id === id);
};

const userLeave = (id) => {
   const index = users.findIndex((user) => user.id === id);

   if (index !== -1) {
      return users.splice(index, 1)[0];
   }
};

const getRoomUsers = (room) => {
   return users.filter((user) => user.room === room);
};

module.exports = {
   joinUser,
   formatMessage,
   getCurrentUser,
   userLeave,
   getRoomUsers,
};
