import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";
import app from "../firebase/firebase.config";
const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState("");
  const [visible, setVisible] = useState(false);

  const loginHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    setError("");
    setSuccess("");

    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setUser(user);
        setSuccess("logged in successful!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
    form.reset();
  };

  // login with google
  const loginWithGoogleHandler = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  // login with github
  const loginWithGithubHandler = () => {
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  // login with facebook
  const loginWithFacebookHandler = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Login</h2>
          <p>Your name is {user?.displayName}</p>
          <p>Your email address is {user?.email}</p>
          <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type={visible ? "text" : "password"} placeholder="Password" />
              <Button onClick={() => setVisible(!visible)} variant="primary" type="button">
                Show Password
              </Button>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <p className="text-danger">{error}</p>
          <p className="text-success">{success}</p>
          <p className="">
            Forget password? <Link to="/resetPassword">Please Reset</Link>
          </p>
          <p>
            New to website? please <Link to="/register">Register</Link>
          </p>
          <p>====== or ======</p>
          <div className="d-flex flex-column gap-3">
            <div>
              <button onClick={loginWithGoogleHandler} className="btn btn-primary">
                login with google
              </button>
            </div>
            <div>
              <button onClick={loginWithGithubHandler} className="btn btn-primary">
                login with github
              </button>
            </div>
            <div>
              <button onClick={loginWithFacebookHandler} className="btn btn-primary">
                login with facebook
              </button>
            </div>
            {/* <div>
              <button className="btn btn-primary">login with phone number</button>
            </div> */}
          </div>
          <p>======== end =======</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
