import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter'
import css from './App.module.css'

 export class App extends Component {
   state = {
     contacts: [],
     filter: '',
   };

   componentDidMount() {
     const contacts = localStorage.getItem('contacts');
     const parsedContacts = JSON.parse(contacts);

     if (parsedContacts) {
       this.setState({ contacts: parsedContacts });
     }
   }

   componentDidUpdate(_, prevState) {
     const nextContacts = this.state.contacts;
     const prevContacts = prevState.contacts;

     if (nextContacts !== prevContacts) {
       localStorage.setItem('contacts', JSON.stringify(nextContacts));
     }
   }

   handleAddContact = newContact =>
     this.setState(({ contacts }) => ({
       contacts: [...contacts, newContact],
     }));

   handleCheckUniqueContact = name => {
     const { contacts } = this.state;

     const isExistContact = !!contacts.find(contact => contact.name === name);

     isExistContact && alert('Contact is already exist');

     return !isExistContact;
   };

   handleRemoveContact = id =>
     this.setState(({ contacts }) => ({
       contacts: contacts.filter(contact => contact.id !== id),
     }));

   handleFilterChange = filter => this.setState({ filter });

   getVisibleContacts = () => {
     const { contacts, filter } = this.state;
     return contacts.filter(contact =>
       contact.name.toLowerCase().includes(filter.toLowerCase())
     );
   };
   render() {
     const { filter } = this.state;
     const visibleContacts = this.getVisibleContacts();
     return (
       <div className={css.container}>
         <h1>Phonebook</h1>
         <ContactForm
           onAdd={this.handleAddContact}
           onCheckUnique={this.handleCheckUniqueContact}
         />
         <h2>Contacts</h2>
         <Filter filter={filter} onChange={this.handleFilterChange} />
         <ContactList
           contacts={visibleContacts}
           onRemove={this.handleRemoveContact}
         />
       </div>
     );
   }
 }
