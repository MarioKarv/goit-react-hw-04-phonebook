import css from './ContactList.module.css'

const ContactListItem = ({ id, name, number, onRemove }) => {
    return (
      <li key={id} className={css.li}>
        {name}: {number}{' '}
        <button className={css.button} onClick={() => onRemove(id)}>
          X
        </button>
      </li>
    );
}

const ContactList = ({ contacts, onRemove }) => {
    if (contacts.length === 0) return null
    return (
        <ul className={css.ul}>
            {contacts.map(contact => <ContactListItem {...contact} onRemove={onRemove}/>)}
        </ul>
    )
}

export default ContactList