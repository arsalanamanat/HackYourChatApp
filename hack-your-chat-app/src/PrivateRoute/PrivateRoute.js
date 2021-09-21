import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
   const { currentUser } = useAuth();

   return <Route {...rest} render={() => (currentUser ? children : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
