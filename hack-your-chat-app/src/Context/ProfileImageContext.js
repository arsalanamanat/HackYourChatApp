import { useContext, createContext, useState } from 'react';
import ImageAvatar from '../Images/blankImage.png';

const ProfileImageContext = createContext();

export const useProfileImage = () => {
   return useContext(ProfileImageContext);
};

export const ProfileImageProvider = ({ children }) => {
   const [profileImage, setProfileImage] = useState(ImageAvatar);

   const value = {
      profileImage,
      setProfileImage,
   };
   return <ProfileImageContext.Provider value={value}>{children}</ProfileImageContext.Provider>;
};
