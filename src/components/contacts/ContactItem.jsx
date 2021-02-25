import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

import {
  clearCurrent,
  deleteContact,
  setCurrent,
  useContacts,
} from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  // we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          className={`badge ${
            type === 'professional' ? 'badge-success' : 'badge-primary'
          } text-capitalize`}
          style={{ float: 'right' }}
        >
          {type}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open px" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone px" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <Link to="form" smooth duration={1400}>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setCurrent(contactDispatch, contact)}
          >
            Edit
          </button>
        </Link>{' '}
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
