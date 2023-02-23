import React, { useState } from "react";

// Firebase
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

// Styles
import "./SignUp.css";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function SignUp(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setSignUpToggle,
    setLogInToggle,
  } = props;

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    try {
      validation();
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
      // if (err.code === "auth/email-already-in-use") {
      //   setEmailError(true);
      // }
      // if (err.code === "auth/weak-password") {
      //   setPasswordError(true);
      // }
    }
  };

  const validation = async () => {
    const validEmail = await fetchSignInMethodsForEmail(auth, email);
    if (validEmail.length > 0) setEmailError(true);
    if (password.length < 6) setPasswordError(true);
  };

  return (
    <section className="section-sign-up">
      <div className="sign-up">
        <div className="sign-up__section-name">
          <div className="sign-up__section-name">
            <IoPersonCircleOutline className="icon" />
            <p className="sign-up__section-text">Sign up</p>
          </div>
        </div>
        <form className="sign-up__form" onSubmit={signIn}>
          <label className="sign-up__email-label">
            {emailError && (
              <p className="sign-up__text">
                Email is already in use. Try another one.
              </p>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Adress"
            />
          </label>
          <label className="sign-up__password-label">
            {passwordError && (
              <p className="sign-up__text">
                Password is insecure try type atleast 6 characters
              </p>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <button className="btn">Register User</button>
        </form>
        <p className="sign-up__text">
          Already have account ?{" "}
          <span
            className="sign-up__log-in-switch"
            onClick={() => {
              setSignUpToggle(false), setLogInToggle(true);
            }}
          >
            Log in
          </span>{" "}
          right now.
        </p>
      </div>
    </section>
  );
}
