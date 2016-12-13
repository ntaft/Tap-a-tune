import React from 'react';

const Header = props => (
  <div
    className="header"
  >
    <h1>Tappity</h1>
    <button className="login-buttons">dummy-drop</button>
    <input
      type="text"
      value={props.signupName}
      name="signupName"
      placeholder="Username"
      onChange={props.updateAuthForms}
    />
    <input
      type="text"
      value={props.signupPass}
      name="signupPass"
      placeholder="Password"
      onChange={props.updateAuthForms}
    />
    <button
      id="signup-button"
      onClick={props.handleSignup}
    >
      Sign up!
    </button>
    <button className="login-buttons">dummy-drop</button>
    <input
        type="text"
        value={props.loginName}
        name="loginName"
        placeholder="Username"
        onChange={props.updateAuthForms}
      />
    <input
      type="text"
      value={props.loginPass}
      name="loginPass"
      placeholder="Password"
      onChange={props.updateAuthForms}
    />
    <button
      id="login-button"
      onClick={props.handleLogin}
    >
      Log in!
    </button>
  </div>
);

export default Header;
