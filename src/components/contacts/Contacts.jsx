import { Fragment, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { getContacts, useContacts } from '../../context/contact/ContactState';
import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';

const Contacts = () => {
  const [contactState, contactDispatch] = useContacts();
  const { contacts, filtered, loading } = contactState;

  const nodeRef = useRef(null);

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Add a contact to your list.</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => {
                return (
                  <CSSTransition
                    nodeRef={nodeRef}
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                );
              })
            : contacts.map((contact) => {
                return (
                  <CSSTransition
                    nodeRef={nodeRef}
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                );
              })}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
