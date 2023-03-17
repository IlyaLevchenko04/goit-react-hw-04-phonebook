import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { ContactForm } from './form';
import { ContactList } from './contactList';
import { Filter } from './Filter';

export function Phonebook() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert('Person already in contacts');
      return;
    }

    setContacts(state => {
      return [...state, { ...contact, id: nanoid() }];
    });
  };

  function handleFilter(evt) {
    setFilter(evt.currentTarget.value);
  }

  function getFilteredContacts() {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  function handleDelete(id) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  const filteredContacts = getFilteredContacts();
  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
      </div>

      <div>
        <h2>Contacts</h2>
        <Filter onChange={handleFilter} />
        {contacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}
