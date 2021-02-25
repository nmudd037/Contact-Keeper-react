import { useContext, useEffect, useState } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import { clearErrors, register, useAuth } from '../../context/auth/AuthState';
import validateEmail from '../../utils/validateEmail';

const Register = (props) => {
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
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [user, setUser] = useState(initialState);

  const { name, email, password, passwordConfirm } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      return setAlert('Please enter all fields to register', 'danger');
    } else if (password !== passwordConfirm) {
      return setAlert('Password and Confirm Password do not match', 'danger');
    } else if (!validateEmail(email)) {
      return setAlert('Please enter a valid email and domain', 'danger');
    }

    register(authDispatch, { name, email, password });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={onChange} required />
        </div>
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
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            required
            minLength="8"
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Register;
