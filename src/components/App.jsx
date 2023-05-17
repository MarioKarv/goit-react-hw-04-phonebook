import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter'
import css from './App.module.css'

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
   })
  
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])


  const [filter, setFilter] = useState('')

  const handleAddContact = newContact => {
     setContacts(prevValue => [...prevValue, newContact])
   }
    

   const handleCheckUniqueContact = name => {

     const isExistContact = !!contacts.find(contact => contact.name === name);

     isExistContact && alert('Contact is already exist');

     return !isExistContact;
   };

  const handleRemoveContact = id => {
     setContacts(contacts.filter(contact => contact.id !== id))
   }

   const handleFilterChange = filter => setFilter(filter);

   const getVisibleContacts = () => {
     return contacts.filter(contact =>
       contact.name.toLowerCase().includes(filter.toLowerCase())
     );
   };
   
     const visibleContacts = getVisibleContacts();
     return (
       <div className={css.container}>
         <h1>Phonebook</h1>
         <ContactForm
           onAdd={handleAddContact}
           onCheckUnique={handleCheckUniqueContact}
         />
         <h2>Contacts</h2>
         <Filter filter={filter} onChange={handleFilterChange} />
         <ContactList
           contacts={visibleContacts}
           onRemove={handleRemoveContact}
         />
       </div>
     );
   }
 
