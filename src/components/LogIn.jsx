import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
// icons
import { IoPersonCircleOutline } from "react-icons/io5";
// styles
import "./LogIn.css";

export default function LogIn(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setSignUpToggle,
    setLogInToggle,
  } = props;

  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    setWrongEmail(false);
    setWrongPassword(false);
    try {
      validation();
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        setWrongPassword(true);
      }
    }
  };

  const logInDemo = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      "bryan.vandas.portfolio@gmail.com",
      "123456"
    );
  };

  const validation = async () => {
    const validEmail = await fetchSignInMethodsForEmail(auth, email);
    if (validEmail.length <= 0) setWrongEmail(true);
  };

  return (
    <section className="section-log-in">
      <div className="log-in">
        <div className="log-in__section-name">
          <IoPersonCircleOutline className="icon" />
          <p className="log-in__section-text">Log In</p>
        </div>
        <form className="log-in__form" onSubmit={logIn}>
          <label className="log-in__email-label">
            {wrongEmail && (
              <p className="log-in__text">This email adress doesn't exist.</p>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Adress"
            />
          </label>
          <label className="log-in__password-label">
            {wrongPassword && (
              <p className="log-in__text">You have entered wrong password.</p>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <div className="log-in__buttons">
            <button className="btn">Log In</button>
            <button className="btn" onClick={logInDemo}>
              Demo
            </button>
          </div>
        </form>
        <p className="log-in__text">
          Don't have account ?{" "}
          <span
            className="log-in__sign-up-switch"
            onClick={() => {
              setLogInToggle(false), setSignUpToggle(true);
            }}
          >
            Sign up
          </span>{" "}
          right now.
        </p>
      </div>
    </section>
  );
}
