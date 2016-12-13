import React from 'react';
import './Header.css'

const Header = props => (
  <div
    className="header"
  ><img
    src="http://freevector.co/wp-content/uploads/2013/05/56093-triple-tap-of-three-fingers-of-a-hand-outlined-gesture-symbol-200x200.png"
    className="logo"
  />
    <span>Tappity</span>
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
