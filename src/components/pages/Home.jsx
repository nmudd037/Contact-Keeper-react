import { useEffect } from 'react';

import { loadUser, useAuth } from '../../context/auth/AuthState';
import ContactFilter from '../contacts/ContactFilter';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';

const Home = () => {
  const authDispatch = useAuth()[1];

  useEffect(() => {
    loadUser(authDispatch);
  }, [authDispatch]);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
