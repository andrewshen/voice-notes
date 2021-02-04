import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import AuthForm from '../components/AuthForm';

const Register = (props) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);

  const onChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    AuthService.register(user).then((data) => {
      const { msgBody, msgError } = data.message;
      setMessage(msgBody);
      if (!msgError) {
        props.history.push('/login');
      }
    });
  };

  return (
    <AuthForm
      isLogin={false}
      message={message}
      onChange={onChange}
      onSubmit={onSubmit}
      username={user.username}
      password={user.password}
    />
  );
};

export default Register;
