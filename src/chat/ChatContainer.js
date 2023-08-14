import React, { useEffect, useRef } from "react";
import { useSubscription } from "@apollo/client";
import { GET_MESSAGES } from "./queries";
import "bootstrap/dist/css/bootstrap.min.css";

const Messages = ({ user_id, user }) => {
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data } = useSubscription(GET_MESSAGES, {
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    scrollToBottom();
  }, [user_id, user, data]);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ message_id, messages_user, message_text }) => (
        <div
          ref={chatContainerRef}
          key={message_id}
          style={{
            display: "flex",
            justifyContent:
              user === messages_user.user ? "flex-end" : "flex-start",
            paddingBottom: "1em",
            alignItems: "center",
          }}
        >
          {user !== messages_user.user && (
            <div
              style={{
                display: "flex",
                height: 40,
                width: 100,
                border: "1px solid Black",
                borderRadius: "1em",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
              }}
            >
              {messages_user.user.slice(0, 8)}
            </div>
          )}
          <div
            style={{
              display: "flex",
              background: user === messages_user.user ? "#58bf56" : "#F5F5F5",
              color: user === messages_user.user ? "white" : "black",
              borderRadius: "0.7em",
              maxWidth: "70%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "1em",
              padding: "0.5em",
              border: "1px solid #e5e6ea",
            }}
          >
            {message_text}
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
