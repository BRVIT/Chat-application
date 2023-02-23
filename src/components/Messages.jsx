import React from "react";
// Styles
import "./Messages.css";

export default function Messages({ messages }) {
  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className="message">
          <p className="message__name">{m.name}</p>
          <p className="message__text">{m.message}</p>
        </div>
      ))}
    </div>
  );
}
