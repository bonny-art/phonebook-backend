import * as contactServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  const { id } = req.user;
  try {
    const contacts = await contactServices.getContacts(id);

    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};
