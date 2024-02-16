import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from 'react';
import ContactContext from '../../../context/contact/ContactContext';
import toast, { Toaster } from 'react-hot-toast';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addcontact, currentContactData, editContact } = contactContext;
  const notify = () => toast.success('Contact Added');
  const edited = () => toast.success('Contact Edited');
  const [contact, setcontact] = useState({
    name: '',
    email: '',
    phone: '',
    relation: 'Personal',
    id: '',
  });
  const onChangeHandler = (e) => {
    setcontact((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmithandler = (e) => {
    e.preventDefault();
    setcontact(() => ({
      name: '',
      email: '',
      phone: '',
    }));
    if (currentContactData !== null) {
      editContact(contact);
      edited();
    } else {
      addcontact(contact);
      notify();
    }
  };

  useEffect(() => {
    setcontact({
      name: currentContactData?.name ?? '',
      email: currentContactData?.email ?? '',
      phone: currentContactData?.phone ?? '',
      relation: currentContactData?.relation ?? '',
      id: currentContactData?.id ?? '',
    });
  }, [currentContactData]);
  return (
    <Form onSubmit={onSubmithandler}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Full Name"
          required
          name="name"
          onChange={onChangeHandler}
          value={contact.name}
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
          value={contact.email}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone No.</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter Phone no"
          required
          name="phone"
          onChange={onChangeHandler}
          value={contact.phone}
        />
      </Form.Group>
      <ButtonGroup className="mb-2" required>
        <ToggleButton
          type="radio"
          variant="outline-danger"
          id="Personal"
          name="relation"
          checked={contact.relation === 'Personal'}
          onChange={onChangeHandler}
          value="Personal"
          required
        >
          Personal
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant="outline-success"
          name="relation"
          id="Other"
          value="Other"
          checked={contact.relation === 'Other'}
          onChange={onChangeHandler}
        >
          Other
        </ToggleButton>
      </ButtonGroup>
      <div>
        <Button variant="primary" type="submit">
          {currentContactData !== null ? 'Edit' : 'Submit'}
        </Button>
      </div>
      <Toaster />
    </Form>
  );
};

export default ContactForm;
