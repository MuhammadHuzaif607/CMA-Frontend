import React, { useId, useReducer } from 'react';
import ContactContext from './ContactContext';
import Reducer from './Contactreducer';
import axios from 'axios';
import {
  ADD_CONTACT,
  CURRENT_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  GET_CONTACT,
  SEARCH_CONTACT,
} from '../type';
import setAuthToken from '../../components/utils/settoken';

const ContactState = ({ children }) => {
  const id = useId();
  let initstate = {
    contacts: [],
    currentContact: null,
    filterdContacts: null,
  };
  const [state, dispatch] = useReducer(Reducer, initstate);

  const addContactHandler = async (data) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      setAuthToken(localStorage.token);
      const res = await axios.post(
        'https://cma-backend-0.vercel.app/api/contact',
        data,
        config
      );
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
        id: id + data.email,
      });
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  // Currentcontact
  const currentcontacthandler = (data) => {
    dispatch({
      type: CURRENT_CONTACT,
      payload: data,
    });
  };
  // Edit contact
  const editContactHandler = async (data) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // eslint-disable-next-line no-unused-vars
      const res = await axios.put(
        `https://cma-backend-0.vercel.app/api/contact/${data.id}`,
        data,
        config
      );
      dispatch({
        type: EDIT_CONTACT,
        payload: res.data.contact,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // Delete contact
  const deleteContactHandler = async (data) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // eslint-disable-next-line no-unused-vars
      const res = await axios.delete(
        `https://cma-backend-0.vercel.app/api/contact/${data.id}`,
        data,
        config
      );
      dispatch({
        type: DELETE_CONTACT,
        payload: data,
      });
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  // Search contact
  const searchContactHandler = (text) => {
    dispatch({
      type: SEARCH_CONTACT,
      payload: text,
    });
  };

  // Get all contact
  const getAllContacts = async () => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      setAuthToken(localStorage.token);
      const res = await axios.get(
        'https://cma-backend-0.vercel.app/api/contact',
        config
      );
      dispatch({
        type: GET_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contact: state.contacts,
        addcontact: addContactHandler,
        currentcontact: currentcontacthandler,
        currentContactData: state.currentContact,
        editContact: editContactHandler,
        deleteContact: deleteContactHandler,
        searchContact: searchContactHandler,
        filterContact: state.filterdContacts,
        getAllContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
