import React from 'react';
import { v4 as uuid } from 'uuid';

const Messages = ({ messages, username, time }) => {
   return (
      <>
         {messages.map((msg) => {
            return (
               <div className={msg.username === username ? 'mymessage' : 'message'} key={uuid()}>
                  <p className="messageTitle">
                     {msg.username} : <span> {time} </span>
                  </p>
                  <p className="textMessage">{msg.text}</p>
               </div>
            );
         })}
      </>
   );
};

export default Messages;
