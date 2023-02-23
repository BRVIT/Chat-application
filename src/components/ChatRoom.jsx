import React, { useEffect, useState } from "react";
// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
// Components
import Messages from "./Messages";

// Styles
import "./ChatRoom.css";

export default function ChatRoom({ loggedIn }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const messagesCollectionRef = collection(db, "Messages");
  const q = query(messagesCollectionRef, orderBy("Time"));

  const getMessages = async () => {
    try {
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMessages(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleNewMessage = (e) => {
    setInputMessage(e.target.value);
    //   setNewMessage({
    //     id: messages.length === 0 ? 1 : messages[messages.length - 1].id + 1,
    //     text: e.target.value,
    //   });

    setNewMessage(e.target.value);
  };

  const submitMessage = async () => {
    try {
      if (newMessage === "") return;
      //   const newMessages = [...messages, newMessage];
      //   setMessages(newMessages);
      //   setInputMessage("");

      await addDoc(messagesCollectionRef, {
        name: loggedIn.charAt(0),
        message: newMessage,
        Time: Date(),
        userId: auth?.currentUser?.uid,
      });
      setInputMessage("");
      getMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      submitMessage();
    }
  };

  return (
    <section className="section-chat-room">
      <div className="chat-room">
        <div className="chat-room__chat-area">
          <Messages messages={messages} />
        </div>

        <div className="chat-room__form-container">
          <input
            type="text"
            value={inputMessage}
            onKeyPress={handleEnterSubmit}
            onChange={handleNewMessage}
          />

          <button
            className="btn btn-message"
            onClick={submitMessage}
            type="submit"
          >
            Send Message
          </button>
        </div>

        <button className="btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </section>
  );
}
