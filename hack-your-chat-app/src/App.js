import JoinChat from './Components/Joinchat/JoinChat';
import LoginForm from './Components/Login/LoginForm';
import SignupForm from './Components/Signup/Signup';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import NavBar from './Components/NavBar/NavBar';
import ChatRoom from './Components/ChatRoom/ChatRoom';
import { SocketProvider } from './Context/SocketContext';
import { AuthProvider } from './Context/AuthContext';
import { ProfileImageProvider } from './Context/ProfileImageContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
   return (
      <SocketProvider>
         <AuthProvider>
            <ProfileImageProvider>
               <Router>
                  <div>
                     <NavBar />
                  </div>

                  <Switch>
                     <Route exact path="/signup" component={SignupForm} />
                     <Route exact path="/login" component={LoginForm} />
                     <Route exact path="/forgetPassword" component={ForgetPassword} />

                     <PrivateRoute path="/chatroom/:username/:room">
                        <ChatRoom />
                     </PrivateRoute>
                     <PrivateRoute path="/">
                        <JoinChat />
                     </PrivateRoute>
                  </Switch>
               </Router>
            </ProfileImageProvider>
         </AuthProvider>
      </SocketProvider>
   );
};

export default App;
