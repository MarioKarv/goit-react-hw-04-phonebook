import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css'


function ContactForm({ onAdd, onCheckUnique }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();


    const isValidatedForm = validateForm();

    if (!isValidatedForm) return;

    onAdd({ id: nanoid(), name, number });
    resetForm();
  };

  const validateForm = () => {
    if (!name || !number) {
      alert('Some field is empty');
      return false;
    }
    return onCheckUnique(name);
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  
    return (
      <form onSubmit={handleFormSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleChangeForm}
          />
        </label>

        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            placeholder="Enter phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleChangeForm}
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }


export default ContactForm;
