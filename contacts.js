const fs = require('fs').promises;
const path = require('path');
require('colors');
const { randomUUID } = require("crypto");


const contactsPath = path.join(__dirname, './db/contacts.json');
  
  
  const  listContacts = async () => {
 try {
   const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' })
   const result = JSON.parse(contacts);
 
		return result;
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
  };

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const getContact = contacts.filter(({ id }) => id === contactId);
		return getContact;
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const removeContact = async(contactId) => {
  try {
		const contacts = await listContacts()
		const newContacts = contacts.filter(({ id }) => id !== contactId)
		await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), { encoding: 'utf-8' })

		return newContacts
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

const addContact = async (name, email, phone) => {
  try {
        
		const contacts = await listContacts()
		const newContact = {
      id: randomUUID,
      name,
      email,
      phone,
    };
		const updatedContacts = [newContact, ...contacts]
		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: 'utf-8' })
		return newContact
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
