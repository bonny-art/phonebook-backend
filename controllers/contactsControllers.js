import HttpError from "../helpers/HttpError.js";
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

export const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await contactServices.deleteContact(
      req.params.id,
      req.user._id
    );
    if (!deletedContact) {
      throw HttpError(404, "Contact not found");
    }
    res.send(deletedContact);
  } catch (e) {
    next(e);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await contactServices.createContact(
      req.body,
      req.user._id
    );

    res.send(newContact);
  } catch (e) {
    next(e);
  }
};
