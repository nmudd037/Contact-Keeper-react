import { useEffect, useRef } from 'react';

import { clearFilter, filterContacts, useContacts } from '../../context/contact/ContactState';

const ContactFilter = () => {
  const [contactState, contactDispatch] = useContacts();
  const { filtered } = contactState;
  const text = useRef();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  }, [filtered]);

  const onChange = (e) => {
    if (text.current.value !== '') {
      return filterContacts(contactDispatch, e.target.value);
    }
    clearFilter(contactDispatch);
  };

  const onSubmit = (e) => e.preventDefault();

  return (
    <form className="searchContainer" onSubmit={onSubmit}>
      <input
        ref={text}
        type="text"
        placeholder="&#xf002;  Filter Contacts..."
        onChange={onChange}
        className="fa"
      />
    </form>
  );
};

export default ContactFilter;
