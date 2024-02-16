import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authcontext';

const Topnavbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logOut } = authContext;
  const loggedInUser = (
    <>
      <Link className="nav-link">
        Hello <span>{user?.name ?? ''}</span>
      </Link>
      <Link to="/" className="nav-link" onClick={logOut}>
        Logout
      </Link>
    </>
  );

  const guestUser = (
    <>
      <Link to="/about" className="nav-link">
        About
      </Link>
      <Link to="/register" className="nav-link">
        Register
      </Link>
    </>
  );

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid style={{ display: 'block' }}>
          <Row className="justify-content-between align-items-center">
            <Col lg={3}>
              <Link to="/" className="navbar-brand">
                CMA
              </Link>
            </Col>
            <Col lg={3}>
              <Nav className="justify-content-end">
                {isAuthenticated ? loggedInUser : guestUser}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Topnavbar;
