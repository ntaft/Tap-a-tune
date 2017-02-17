import React from 'react';
import './Header.css'

const Header = props => (
  <div className="header">
    <div className="logo-box">

      <img
      src="http://freevector.co/wp-content/uploads/2013/05/56093-triple-tap-of-three-fingers-of-a-hand-outlined-gesture-symbol-200x200.png"
      className="logo"
    />
    </div>
    <h1>Tappity</h1>
    <div className={props.userId === 0 ? "login-container" : "hide login-container"}>
      <div
        className="signup-box"
      >
        <button
          id="signup-button"
          onClick={props.handleSignup}
        >
          Sign up!
        </button>
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
      </div>
    <div className="login-box">
      <button
        onClick={props.handleLogin}
      >
        Log in!
      </button>
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
    </div>
  </div>
  <button
    className={props.userId === 0 ? "hide logout-button" : "logout-button"}
    onClick={props.handleLogout}
  >Log Out
  </button>
</div>
);

export default Header;
