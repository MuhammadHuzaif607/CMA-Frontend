import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import Navbar from '../../common/Navbar/navbar';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import AuthContext from '../../../context/auth/authcontext';
import { useNavigate } from 'react-router-dom';

const Registerdefault = () => {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const navigate = useNavigate('');
  const authContext = useContext(AuthContext);
  const { registerUser, error, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
    if (error !== null) {
      toast.error(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated]);
  const onChangeHandler = (e) => {
    setRegister((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (register.password !== register.confirmpassword) {
      toast.error("Passwords aren't same");
    } else {
      registerUser(register);
    }
  };
  return (
    <>
      <Navbar />
      <section style={{ padding: '50px 0' }}>
        <Col lg={4} className="mx-auto">
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                required
                name="name"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your email"
                required
                name="email"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                required
                name="password"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                required
                name="confirmpassword"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <Toaster />
          </Form>
        </Col>
      </section>
    </>
  );
};

export default Registerdefault;
