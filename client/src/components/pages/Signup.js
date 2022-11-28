import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import AuthService from "../../utils/auth";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userData },
      });

      console.log(data);
      AuthService.newLogin(data.createUser.token);
    } catch (err) {
      console.log(err);
    }

    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        className="form-style"
      >
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Your username and/or email is already in use. Please log in if you
          already have an account.
        </Alert>

        <h1 className="form-header">Sign up below:</h1>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userData.username && userData.email && userData.password)}
          type="submit"
          variant="dark"
          className="form-btn"
        >
          <span className="btn-text">Register</span>
        </Button>
      </Form>
    </>
  );
};

export default Signup;