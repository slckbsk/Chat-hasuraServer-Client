import React, { useEffect } from "react";
import { POST_MESSAGES } from "./queries";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Messages from "./ChatContainer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSubscription, useMutation } from "@apollo/client";
import { GET_USERS_SUB, USERS_COUNT, DELETE_USER } from "./queries";
import Loading from "./Loading";

const Chat = () => {
  const location = useLocation();
  let user = null;
  let user_id = null;

  if (location.state) {
    user = location.state.user;
    user_id = location.state.user_id;
  }
  const navigate = useNavigate();

  const [state, stateSet] = React.useState({
    user_id: user_id,
    user: user,
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGES, {
    variables: {
      user_id: user_id,
    },
  });

  const [Quit] = useMutation(DELETE_USER, {
    variables: {
      user_id: user_id,
    },
  });

  const { loading, error, data } = useSubscription(GET_USERS_SUB);
  const { data: subscriptionData } = useSubscription(USERS_COUNT);

  useEffect(() => {
    const userCount = subscriptionData?.users_aggregate?.aggregate?.count;

    if (!location.state) {
      console.log("Location state is null or undefined");
      navigate(`/`);
    } else if (subscriptionData && userCount === 0) {
      navigate(`/`);
    } else if (!loading && data && data.users) {
      let matchFound = false;
      let i = 0;

      while (i < data.users.length) {
        if (
          state.user_id === data.users[i].user_id &&
          state.user === data.users[i].user
        ) {
          matchFound = true;
          break;
        }
        i++;
      }

      if (!matchFound) {
        navigate(`/`);
      }
    }
  }, [
    subscriptionData,
    loading,
    data,
    location.state,
    state.user_id,
    state.user,
    navigate,
  ]);

  if (loading)
    return (
      <Container
        style={{
          display: "flex",
          background: "#F5F5F5",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1em",
          border: "1px solid Black",
          maxWidth: "70%",
          height: "700px",
          padding: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 400,
          }}
        >
          <Loading />
        </div>
      </Container>
    );
  if (error) return <div>Error!: {error.message}</div>;

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }

    stateSet({
      user: state.user,
      user_id: state.user_id,
      content: "",
    });
  };

  const onQuit = () => {
    Quit({
      variables: state.user_id,
    });

    stateSet({
      user: "",
      user_id: "",
      content: "",
    });
  };

  return (
    <Container
      style={{
        background: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "1em",
        border: "1px solid Black",
        maxWidth: "70%",
        height: "700px",
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          background: "white",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          height: "600px",
          overflowY: "scroll",
          margin: 10,
        }}
      >
        <Messages user_id={state.user_id} user={state.user} />
      </div>
      <Row style={{ margin: 15 }}>
        <Col
          sm={2}
          style={{
            background: "#58bf56",
            borderRadius: "0.3em",
          }}
        >
          <Form.Label
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
            }}
            aria-label="User"
            onChange={(e) => stateSet({ ...state, user: e.target.value })}
          >
            {user}
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Control
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
            value={state.content}
            aria-label="Content"
            onChange={(e) =>
              stateSet({
                ...state,
                content: e.target.value,
              })
            }
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onSend();
              }
            }}
          />
        </Col>
        <Col sm={1} style={{ padding: 1 }}>
          <Button
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
            }}
            size="text"
            variant="primary"
            onClick={() => onSend()}
          >
            Send
          </Button>
        </Col>
        <Col sm={1} style={{ padding: 1 }}>
          <Button
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
            }}
            size="text"
            variant="primary"
            onClick={() => onQuit()}
          >
            Quit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
