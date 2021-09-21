import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './signup.css';
import { useAuth } from '../../Context/AuthContext';

const SignupForm = () => {
   const emailRef = useRef();
   const passwordRef = useRef();
   const confirmPasswordRef = useRef();
   const { signup } = useAuth('');
   const [error, setError] = useState();
   const [loading, setLoading] = useState(false);

   const history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
         return setError('Passwords do not Match');
      }

      try {
         setLoading(true);
         await signup(emailRef.current.value, passwordRef.current.value);

         setError('Account Successfully Created');
         history.push('/');
      } catch (err) {
         setError('Failed to Create an Account');
      }
   };

   return (
      <div className="signupFormContainer">
         <div className="signupForm">
            <div>
               <h2 className="createAccountText">Create an account</h2>
               {error && <h2 className="errorNotification">{error}</h2>}
            </div>
            <form onSubmit={handleSubmit}>
               <input type="text" placeholder="Enter Email*" className="inputField" ref={emailRef} /> <br />
               <input type="Password" placeholder="Choose Password*" className="inputField" ref={passwordRef} />
               <br />
               <input type="Password" placeholder="Confirm Password*" className="inputField" ref={confirmPasswordRef} />
               <br />
               <button disabled={loading} className="signupBtn">
                  {' '}
                  Register{' '}
               </button>{' '}
               <br />
               <hr />
               <div>
                  <p>
                     Already Have an account ?{' '}
                     <Link to="/login" className="login">
                        <span>Log In</span>
                     </Link>
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default SignupForm;
