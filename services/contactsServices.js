import { Contact } from "../db/models/Contact.js";

export const getContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};
