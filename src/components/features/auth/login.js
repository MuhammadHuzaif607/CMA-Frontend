import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import Navbar from '../../common/Navbar/navbar';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import AuthContext from '../../../context/auth/authcontext';
import { useNavigate } from 'react-router-dom';

const Logindefault = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loginUser, error, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
    if (error !== null && error !== undefined) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated]);
  const onChangeHandler = (e) => {
    setLogin((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(login);
  };
  return (
    <>
      <Navbar />
      <section style={{ padding: '50px 0' }}>
        <Col lg={4} className="mx-auto">
          <Form onSubmit={submitHandler}>
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

export default Logindefault;
