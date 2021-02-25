import axios from 'axios';
import { useContext, useReducer } from 'react';

import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from '../types';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';

// Create a custom hook to use the contact context
export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

// action creators
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get Contacts
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('https://contact-keeper-server-v1.herokuapp.com/api/contacts');

    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// Add Contact
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post(
      'https://contact-keeper-server-v1.herokuapp.com/api/contacts',
      contact,
      config
    );

    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// Delete Contact
export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`https://contact-keeper-server-v1.herokuapp.com/api/contacts/${id}`);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// Update Contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.patch(
      `https://contact-keeper-server-v1.herokuapp.com/api/contacts/${contact._id}`,
      contact,
      config
    );

    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// Clear contacts
export const clearContacts = (dispatch) => {
  dispatch({ type: CLEAR_CONTACTS });
};

// Set Current Contact
export const setCurrent = (dispatch, contact) => {
  dispatch({ type: SET_CURRENT, payload: contact });
};
// Clear Current Contact
export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

// Filter Contacts
export const filterContacts = (dispatch, text) => {
  dispatch({ type: FILTER_CONTACTS, payload: text });
};
// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  return (
    <ContactContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
