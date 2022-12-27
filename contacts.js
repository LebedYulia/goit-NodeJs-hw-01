const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");
console.log(contactsPath);


async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.log(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const contact = contacts.find((contact) => contact.id == contactId);
    console.log(contact);
  } catch (error) {
    console.error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const deleteContact = contacts.filter((contact) => contact.id != contactId);
    console.log(deleteContact);
  } catch (error) {
    console.error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    console.log(contactst);
  } catch (error) {
    console.error;
  }
}

listContacts();
getContactById(5);

module.exports = { listContacts, getContactById, removeContact, addContact };
