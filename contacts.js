const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

async function parseContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  const contacts = await parseContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await parseContacts();
  const contact = contacts.find(({ id }) => Number(id) === contactId);
  if (!contact) {
    return console.error(`Contact with ID: ${contactId} not found!`.red);
  }
  console.table(contact);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await parseContacts();
  const newContacts = contacts.filter(({ id }) => Number(id) !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
  console.table(newContacts);
  return newContacts;
}

async function addContact(name, email, phone) {
  const contacts = await parseContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  if (contacts.find((contact) => contact.name === name)) {
    return console.warn(`Contact with name ${name} already exists!`.red);
  }
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
  console.log(`Contact with name ${name} was added!`.green);
  console.table(newContacts);
  return newContacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
