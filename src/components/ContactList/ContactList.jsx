import styles from "./contactList.module.css";
import { MainTitle } from "components/Main.styled";
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from "react-redux";
import { removeContact } from "redux/contacts/items-slice";
import { getFilteredContacts } from "redux/contacts/items-selectors";

export default function ContactList() {

    const contacts = useSelector(getFilteredContacts);
    const dispatch = useDispatch();

    const onRemoveContact = (id) => {
        const action = removeContact(id);
        dispatch(action);
    }

    const elements = contacts.map(({name, number, id}) => {
        return <li key={id} className={styles.item}> {name}: {number} <span onClick={() => onRemoveContact(id)} className={styles.remove}>X</span></li>
    })
    return (
        <>
            <MainTitle>Contact list</MainTitle>
            <ol>{elements}</ol>
        </>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}