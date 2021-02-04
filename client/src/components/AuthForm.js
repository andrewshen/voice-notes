import React from 'react';

const AuthForm = ({
  isLogin,
  message,
  onChange,
  onSubmit,
  username,
  password,
}) => {
  return (
    <div className="form-container">
      {message && <div className="message">{message}</div>}
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={onChange}
      />
      <button onClick={onSubmit}>{isLogin ? 'Login' : 'Register'}</button>
      {isLogin ? (
        <a href="/register">No account? Register</a>
      ) : (
        <a href="/login">Have an account? Login</a>
      )}
    </div>
  );
};

export default AuthForm;
