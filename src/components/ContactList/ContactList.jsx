import styles from "./contactList.module.css";
import { MainTitle } from "components/Main.styled";
import { useSelector, useDispatch } from "react-redux";
import { removeContact } from "redux/contacts/items-slice";
import { getFilteredContacts } from "redux/contacts/items-selectors";

export default function ContactList() {

    const contacts = useSelector(getFilteredContacts);
    console.log(contacts)
    const dispatch = useDispatch();

    const onRemoveContact = (id) => {
        const action = removeContact(id);
        dispatch(action);
    }

    return (
        <>
                {contacts?.length > 0 ?
                    (<>
                        <MainTitle>Contact list</MainTitle>
                    <ol>

                            { contacts.map(({name, number, id}) => {
                                    return <li key={id} className={styles.item}> {name}: {number} <span onClick={() => onRemoveContact(id)} className={styles.remove}>X</span></li>
                            }
                            )}
                    </ol>
                    </>) :  (<p>No contacts yet</p>)
                }
        </>
    )
}
