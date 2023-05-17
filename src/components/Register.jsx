import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import app from "../firebase/firebase.config";
const auth = getAuth(app);

const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  const registerHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    setError("");
    setSuccess("");

    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("At least one upper case");
      return;
    } else if (!/(?=.*?[a-z])/.test(password)) {
      setError("At least one lower case English letter");
      return;
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("At least one special character");
      return;
    } else if (!/.{6,}/.test(password)) {
      setError("Password should be at least 6 character");
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        setSuccess("User created successfully!!");
        form.reset();

        // verify email
        sendEmailVerification(auth.currentUser).then(() => {
          alert("Please verify your email!");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setSuccess("");
      });

    // set user name
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Register</h2>
          <p>Your name is {user?.displayName}</p>
          <p>Your email address is {user?.email}</p>
          <Form onSubmit={registerHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <p className="text-danger">{error}</p>
          <p className="text-success">{success}</p>
          <p>
            Already have an account? please <Link to="/login">Login</Link>
          </p>

          <p>===============</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
