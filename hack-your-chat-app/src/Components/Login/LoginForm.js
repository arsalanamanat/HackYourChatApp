import { useRef, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import hyfImage from '../../Images/hackyourfuture.png';
import './loginform.css';

const LoginForm = () => {
   const emailRef = useRef();
   const passwordRef = useRef();
   const { login } = useAuth('');
   const [error, setError] = useState();

   const history = useHistory();
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         setError();
         await login(emailRef.current.value, passwordRef.current.value);
         history.push('/');
      } catch (err) {
         setError('Failed to Login');
      }
   };

   return (
      <div className="loginFormContainer">
         {' '}
         <div className="loginFormHeading">
            <img src={hyfImage} className="loginFormImage" alt="loginImage" />
         </div>
         <div className="loginForm">
            {error && <p className="errorNotification">{error}</p>}
            <form onSubmit={handleSubmit}>
               <input type="text" placeholder="Email" className="loginInputField" ref={emailRef} /> <br />
               <input type="Password" placeholder="Password" className="loginInputField" ref={passwordRef} />
               <br />
               <button className="loginBtn"> Log In </button> <br />
               <div className="otherOptions">
                  <hr className="hr" />
                  OR
                  <hr className="hr" />
               </div>
               <div className="forgetYourPassword">
                  <p>
                     Forgot Your Password ?
                     <Link to="/forgetPassword" className="clickHere">
                        {' '}
                        <span>Click Here </span>{' '}
                     </Link>{' '}
                  </p>
               </div>
            </form>
         </div>
         <div className="signUpContainer">
            <p>
               Need a account?{' '}
               <Link to="/signup" className="signUp">
                  <span>Sign Up</span>
               </Link>
            </p>
         </div>
      </div>
   );
};

export default LoginForm;
