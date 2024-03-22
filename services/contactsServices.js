import { Contact } from "../db/models/Contact.js";

export const getContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

export const createContact = async ({ name, number }, owner) => {
  const newContact = await Contact.create({ name, number, owner });
  return newContact;
};

export const deleteContact = async (id, owner) => {
  const contactToDelete = await Contact.findOneAndDelete({ _id: id, owner });
  return contactToDelete;
};
