import PropTypes from 'prop-types';
import { Container, Button, MainTitle, Label, Input } from '../Main.styled';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/contacts/contacts-slice';
import { useDispatch } from 'react-redux';

export default function Form({ onSubmit }) {
    const dispatch = useDispatch();
   
const [name, setName] = useState('');
const [number, setNumber] = useState('');
const [invalidForm, setInvalidForm] = useState(false);

const handleChange = e => {
    switch(e.target.name) {
        case 'name':
            setName(e.target.value);
            break;

        case 'number':
            setNumber(e.target.value);
            break;

        default:
            return;
    }
}
   const validateForm = (name, number) => {
        const isValid = !!name && !!number;
        return isValid;
    }

  const handleSubmit = e => {
        e.preventDefault();

        const isValid = validateForm(name, number);
        if(isValid) {
                const newContact = {name,
                                    id: nanoid(),
                                    number,
                                }
                dispatch(addContact(newContact));
        reset();
        } else  {
            setInvalidForm(true);
        }
    }
       
  const reset = () => {
        setName('');
        setNumber('');
    }

        return (
            <Container>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="name">
                        <MainTitle>Name</MainTitle>
                            <Input
                                    type="text"
                                    name="name"
                                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                                    required
                                    onChange={handleChange}
                                    value={name}
                                    minLength={3}
                                    placeholder="Please enter your name"
                            />
                    </Label>

                    <Label htmlFor="tel">
                        <MainTitle>Phone number</MainTitle>
                        <Input
                                type="tel"
                                name="number"
                                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                                required
                                onChange={handleChange}
                                value={number}
                                minLength={5}
                                placeholder="Please enter your number"
                        />
                    </Label>
                <br />
                <Button type="submit">Add contact</Button>
                <div>{invalidForm ? (<p>Make sure you enter unique contact</p>) : null}</div>

            </form>
            </Container>
        )
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}