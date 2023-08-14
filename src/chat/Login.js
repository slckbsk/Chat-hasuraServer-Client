import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "./queries";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UsersList from "./UsersList";

const Login = () => {
  const [state, stateSet] = useState({ user: "", user_id: null });
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      user: state.user,
    },
  });

  const onLogin = async () => {
    if (state.user.length > 0) {
      try {
        const response = await login({
          variables: {
            user: state.user,
          },
        });

        if (!response.errors) {
          state.user_id = response.data.insert_users_one.user_id;
          navigate(`/chat`, {
            state: { user: state.user, user_id: state.user_id },
          });
        } else {
          setText("Unknown Error");
        }
      } catch (error) {
         const errors = error.graphQLErrors.map((error) => error.message);
         console.log(errors);
         setText("USER ALREADY EXISTS");
      }
    }

    stateSet({
      user: state.user,
      user_id: state.user_id,
    });
  };

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
      <Row
        style={{
          width: "100%",
        }}
      >
        <Col
          style={{
            padding: 20,
            background: "white",
            height: 300,
            borderRadius: "1em",
            border: "1px solid Black",
            margin: 20,
          }}
        >
          <Form.Label>Enter Nick Name</Form.Label>
          <Form.Control
            type="text"
            value={state.user}
            aria-label="User"
            onChange={(e) => stateSet({ ...state, user: e.target.value })}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onLogin();
              }
            }}
          />
          <Form.Text
            style={{
              height: 30,
              display: "flex",
              color: "red",
              alignItems: "center",
            }}
          >
            {text}
          </Form.Text>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <Button size="text" variant="primary" onClick={() => onLogin()}>
              JOİN
            </Button>
          </div>
        </Col>
        <Col
          style={{
            padding: 20,
            background: "white",
            height: 300,

            borderRadius: "1em",
            border: "1px solid Black",
            margin: 20,
          }}
        >
          <Form.Label>ONLİNE USER LİST</Form.Label>
          <UsersList />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
