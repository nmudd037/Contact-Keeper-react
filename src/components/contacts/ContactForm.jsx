import { useContext, useEffect, useState } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import {
  addContact,
  clearCurrent,
  updateContact,
  useContacts,
} from '../../context/contact/ContactState';
import validateEmail from '../../utils/validateEmail';

const ContactForm = () => {
  const { setAlert } = useContext(AlertContext);

  const [contactState, contactDispatch] = useContacts();
  const { current } = contactState;

  const initialState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  };
  const [contact, setContact] = useState(initialState);

  useEffect(() => {
    if (current !== null) {
      return setContact(current);
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setAlert('Please enter a valid email and domain', 'danger');
    } else if (current === null) {
      addContact(contactDispatch, contact);
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmit} id="form">
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
      <input
        type="Email"
        placeholder="Email  (abc@example.com)"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="tel"
        placeholder="Phone  (123-456-7890)"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        id="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />
      <label htmlFor="personal">Personal</label>
      <input
        type="radio"
        name="type"
        value="professional"
        id="professional"
        onChange={onChange}
        checked={type === 'professional'}
      />
      <label htmlFor="professional">Professional</label>
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
