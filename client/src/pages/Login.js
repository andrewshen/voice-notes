import React, { useContext, useState } from 'react';
import AuthService from '../services/AuthService';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../context/AuthContext';

const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/');
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <AuthForm
      isLogin={true}
      message={message}
      onChange={onChange}
      onSubmit={onSubmit}
      username={user.username}
      password={user.password}
    />
  );
};

export default Login;
