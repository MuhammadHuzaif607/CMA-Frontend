import React, { useContext } from 'react';
import ContactContext from '../../../context/contact/ContactContext';
import Contactitem from './contactitem';
import { Col, Row } from 'react-bootstrap';
import SearchBar from '../../common/SearchBar/index';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contact, filterContact } = contactContext;
  return (
    <>
      <Row>
        <SearchBar></SearchBar>
        {filterContact !== null && filterContact.length > 0
          ? filterContact.map((item) => {
              return (
                <Col md={6}>
                  <Contactitem
                    key={item.id} // Add unique key prop here
                    name={item.name}
                    age={item.age}
                    id={item.id}
                    email={item.email}
                    phone={item.phone}
                    relation={item.relation}
                  />
                </Col>
              );
            })
          : contact.map((item) => {
              const id1 = item._id;
              return (
                <Col md={6} xs={12}>
                  <Contactitem
                    key={id1} // Add unique key prop here
                    name={item.name}
                    age={item.age}
                    id={id1}
                    email={item.email}
                    phone={item.phone}
                    relation={item.relation}
                  />
                </Col>
              );
            })}
      </Row>
    </>
  );
};

export default Contacts;
