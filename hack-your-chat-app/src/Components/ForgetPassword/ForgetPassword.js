import { useRef, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import './forgetpassword.css';

const ForgetPassword = () => {
   const emailRef = useRef();

   const { reset } = useAuth();
   const [error, setError] = useState();
   const [message, setMessage] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         setError();
         await reset(emailRef.current.value);
         setMessage(`Check you Email for Further Instructions ${emailRef.current.value}`);
      } catch (err) {
         setError('Failed to Reset');
      }
   };

   return (
      <div className="ForgetPasswordFormContainer">
         <div>
            {' '}
            <h2>Password Reset</h2>
            {error && <h2 className="errorNotification">{error}</h2>}
            {message && <h2 className="errorNotification">{message}</h2>}
         </div>
         <div className="resetForm">
            <form onSubmit={handleSubmit}>
               <input type="text" placeholder="Type your registered Email" className="resetInputField" ref={emailRef} /> <br />
               <br />
               <button className="resetBtn"> Reset Password </button> <br />
               <hr />
               <div>
                  <p>Already have an Account ?</p>
                  <Link to="/login" className="login">
                     <p>Log In</p>
                  </Link>
               </div>
               <hr />
               <div>
                  <p>
                     Need a account?{' '}
                     <Link to="/signup" className="login">
                        <span>Sign Up</span>
                     </Link>
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ForgetPassword;
