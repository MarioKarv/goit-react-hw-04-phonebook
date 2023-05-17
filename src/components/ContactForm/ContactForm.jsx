import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css'

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validateForm();

    if (!isValidatedForm) return;

    onAdd({ id: nanoid(), name, number });
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;
    if (!name || !number) {
      alert('Some field is empty');
      return false;
    }
    return onCheckUnique(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
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
            onChange={this.handleChangeForm}
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
            onChange={this.handleChangeForm}
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
