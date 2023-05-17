import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import app from "../firebase/firebase.config";
const auth = getAuth(app);

const ResetPassword = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();

  const passwordResetHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide your email");
      return;
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Please check your email");
          emailRef.current.value = "";
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Forget Password</h2>
          <Form onSubmit={passwordResetHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control ref={emailRef} name="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <p className="text-danger">{error}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
