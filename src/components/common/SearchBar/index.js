import React from 'react';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useRef, useContext } from 'react';
import ContactContext from '../../../context/contact/ContactContext';

const SearchBar = () => {
  const searchref = useRef('');
  const contactContext = useContext(ContactContext);
  const { searchContact } = contactContext;
  const searchHandler = (e) => {
    if (e.target.value !== null) {
      searchref.current.value = e.target.value;
      searchContact(e.target.value);
    } else {
      searchref.current.value = '';
    }
  };
  const submithandler = (e) => {
    e.preventDefault();
    searchContact(searchref.current.value);
  };
  return (
    <>
      <Col xs={12}>
        <Form.Group className="mb-3" onSubmit={submithandler}>
          <Form.Control
            type="text"
            placeholder="Search Contacts"
            required
            onChange={searchHandler}
            ref={searchref}
          />
        </Form.Group>
      </Col>
    </>
  );
};

export default SearchBar;
