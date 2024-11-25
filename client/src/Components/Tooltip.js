import React from "react";
import PropTypes from "prop-types";

export default function Tooltip({ messages, visible }) {
  return (
    <div className={`tooltip-box ${visible ? "visible" : ""}`}>
      {messages.map((message, index) => (
        <p key={index} className={message.valid ? "text-success" : "text-danger"}>
          {message.valid ? "✔" : "✘"} {message.text}
        </p>
      ))}
    </div>
  );
}

Tooltip.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
    })
  ).isRequired,
  visible: PropTypes.bool.isRequired,
};
