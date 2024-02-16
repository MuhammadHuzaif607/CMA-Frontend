import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import './index.css';
import Button from 'react-bootstrap/Button';
import ContactContext from '../../../context/contact/ContactContext';
import toast from 'react-hot-toast';

const Contactitem = ({ name, id, email, phone, relation }) => {
  let color = relation === 'Personal' ? 'blue' : 'black';
  const contactContext = useContext(ContactContext);
  const { currentcontact, deleteContact } = contactContext;

  // Edit  contacts
  const editHandler = () => {
    currentcontact({
      id,
      name,
      email,
      phone,
      relation,
    });
  };

  // Delete contact
  const deleteHandler = () => {
    deleteContact({
      id,
      name,
      email,
      phone,
      relation,
    });
    toast.success('Contacts deleted');
  };

  return (
    <Card style={{ width: '100%' }} className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 " style={{ color }}>
          {relation}
        </Card.Subtitle>
        <p>{email}</p>
        <p>{phone}</p>
        <Button variant="primary me-3" onClick={editHandler}>
          Edit
        </Button>
        <Button variant="danger" onClick={deleteHandler}>
          Delete
        </Button>{' '}
      </Card.Body>
    </Card>
  );
};

export default Contactitem;
