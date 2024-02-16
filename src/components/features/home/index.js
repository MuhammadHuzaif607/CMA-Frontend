import Layout from '../../ui/layout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Contacts from './contacts';
import Form from './form';
import { useContext, useEffect } from 'react';
import ContactContext from '../../../context/contact/ContactContext';
import AuthContext from '../../../context/auth/authcontext';

const HomeDefault = () => {
  const { getAllContacts } = useContext(ContactContext);
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
    getAllContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Layout />
      <section>
        <Container fluid>
          <Row>
            <Col>
              <Form />
            </Col>
            <Col>
              <Contacts />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomeDefault;
