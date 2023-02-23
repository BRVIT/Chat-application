import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignUp from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";
import LogIn from "./components/LogIn";
// Styles
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [logInToggle, setLogInToggle] = useState(true);
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(user.email);
      } else {
        setLoggedIn("");
      }
    });
  }, [email]);

  return (
    <div className="App">
      {loggedIn ? (
        <ChatRoom loggedIn={loggedIn} />
      ) : (
        <>
          {logInToggle && (
            <LogIn
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setSignUpToggle={setSignUpToggle}
              setLogInToggle={setLogInToggle}
            />
          )}

          {signUpToggle && (
            <SignUp
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setSignUpToggle={setSignUpToggle}
              setLogInToggle={setLogInToggle}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
