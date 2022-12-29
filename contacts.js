const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.resolve("./db/contacts.json");



async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    console.table(contacts);
    return contacts;

  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = contacts.find(
      (contact) => Number(contact.id) === contactId
    );
    console.table(contact);
  } catch (error) {
    console.error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const deleteContact = contacts.filter(
      (contact) => Number(contact.id) !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(deleteContact), "utf-8");
    console.table(deleteContact);
  } catch (error) {
    console.error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newContact = {
      id: nanoid() ,
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
    console.table(newContacts);
  } catch (error) {
    console.error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
