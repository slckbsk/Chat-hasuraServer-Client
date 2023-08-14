import { Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="*" element={<MatchAllRoute />} />
        </Routes>
      </div>
    </div>
  );
}

function MatchAllRoute() {
  const navigate = useNavigate();
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
          padding: 20,
          background: "white",
          height: 300,
          borderRadius: "1em",
          border: "1px solid Black",
          margin: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        The requested page does not exist
        <Button
          size="text"
          variant="primary"
          style={{ width: "50%" }}
          onClick={() => navigate(`/`)}
        >
          Login Page
        </Button>
      </Row>
    </Container>
  );
}
export default App;
