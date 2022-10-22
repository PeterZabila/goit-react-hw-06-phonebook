import { useState, useEffect } from 'react';
import { Wrapper, Container } from './Main.styled';
import ContactList from './ContactList/ContactList';
import Form from './Form/Form';
import Filter from './Filter/Filter';

const defaultContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];

export default function App() {
  // const storageContacts =  JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if(localContacts?.length) {
      setContacts(localContacts);
    } else {
      setContacts(defaultContacts);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    
  }, [contacts]);

  const handleChange = e => {
    setFilter(e.target.value);
  }

  const getFilteredContacts = () => {
    if(!filter) {
      return contacts;
    } 
        const normalizedFilter = filter.toLowerCase();
        const filteredContacts = contacts.filter(({name}) => {
            const normalizedName = name.toLowerCase();
            const result = normalizedName.includes(normalizedFilter);
          return result;
        })
    return filteredContacts;
  }

// МОЖЛИВО В ЦІЙ ФУНКЦІЇ ТРАБЛ
  const addContact = (newContact) => {
    console.log(newContact)
    console.log(newContact.name, newContact.number);
    console.log(contacts)
    const a = contacts.findIndex(contact => newContact.name.toLowerCase() === contact.name.toLowerCase())
    console.log(a);
    if(a > - 1) {
      alert(newContact.name + ' is already in contacts');
      return;
    }

    setContacts([newContact, ...contacts],
    );
  };

  const onDeleteContact = (id) => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== id)
    ))
  }

  return (
    <Wrapper>
        <Container>
          <Form onSubmit={addContact}/>
        </Container>
        
        <Container>

          <Filter onChange={handleChange} value={filter}/>
        </Container>
        <Container>
          {contacts.length !== 0 && (
             <ContactList
             contacts={getFilteredContacts()}
             onDeleteContact={onDeleteContact}
           />
          )}
         
        </Container>
      </Wrapper>

  )
}
// class App extends Component {


//   componentDidMount () {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));
//     if(contacts?.length) {
//       this.setState({contacts})
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if(this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

//   addContact = ({ name, number }) => {
//     if (this.state.contacts.find(contact => contact.name.toLowerCase === name.toLowerCase)) {
//       alert(name + ' is already in contacts');
//       return;
//     }

//     const contact = {
//       name,
//       number,
//       id: nanoid(),
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//   };


//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ 
//         [name]: value,
//     })
// }

//   getFilteredContacts() {
//     const { contacts, filter } = this.state;

//     if(!filter) {
//       return contacts;
//     } 
//         const normalizedFilter = filter.toLowerCase();
        
//         const filteredContacts = contacts.filter(({name}) => {
//             const normalizedName = name.toLowerCase();
//             const result = normalizedName.includes(normalizedFilter);
//           return result;
//         })
//     return filteredContacts;
//   }

//   onDeleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }))
// }
  
//   render () {
//     const { addContact } = this;
//     const contacts = this.getFilteredContacts();
//     return (
//       <Wrapper>
//         <Container>
//           <Form onSubmit={addContact}/>
//         </Container>
        
//         <Container>

//           <Filter onChange={this.handleChange} value={this.state.filter}/>
//         </Container>
//         <Container>
//           <ContactList
//             contacts={contacts}
//             onDeleteContact={this.onDeleteContact}
//           />
//         </Container>
//       </Wrapper>
//     )
//   }
// };
