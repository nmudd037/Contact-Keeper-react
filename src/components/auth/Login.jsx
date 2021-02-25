import { useContext, useEffect, useState } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import { clearErrors, login, useAuth } from '../../context/auth/AuthState';
import validateEmail from '../../utils/validateEmail';

const Login = (props) => {
  const { setAlert } = useContext(AlertContext);

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [isAuthenticated, props.history, error, authDispatch, setAlert]);

  const initialState = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialState);

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      return setAlert('Please enter all fields to register', 'danger');
    }
    if (!validateEmail(email)) {
      return setAlert('Please enter a valid email and domain', 'danger');
    }
    login(authDispatch, { email, password });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="8"
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Login;
