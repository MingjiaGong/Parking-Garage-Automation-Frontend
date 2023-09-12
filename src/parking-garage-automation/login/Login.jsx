import React, { useState } from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../services/loginThunk";
import { Button, Modal } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";



export const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // New state variable
  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable

  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const navForget = () => {
    navigate("/forget");
  };

  const navUsermodule = () => {
    navigate("/usermodule");
  };

  const navManagementSystem = ()=>{
    navigate('/modules');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormSubmitted(true); // Update the state variable
    // Check if the input fields are empty
    if (username === "" || password === "") {
      setShowWarning(true);
      return;
    }

    await dispatch(loginThunk({ username, password })).then((req) => {
      if (req.type === "/login/rejected") {
        setShow(true);
      }

      const decoded = jwtDecode(req.payload.token);

      if (decoded.role === 1 || decoded.role === 2) {
        navManagementSystem()
      } else if (decoded.role === 3) {
        navUsermodule()
      }
    });

  };


  return (
    <>
      <div className={styles.container}>
        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
              <input
                className={styles.inputClass}
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <input
                className={styles.inputClass}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button className={styles.buttonClass} type="submit">
              Submit
            </button>
          </form>
          <button
            className={`${styles.buttonClass} mt-3`}
            onClick={navForget}
            type="submit"
          >
            Forgot Password
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Incorrect username or password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your username or password is not correct.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Warning modal */}
      <Modal
        show={showWarning && formSubmitted}
        onHide={() => setShowWarning(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please fill up all input fields before submitting.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowWarning(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
