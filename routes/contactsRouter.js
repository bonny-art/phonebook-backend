import express from "express";
import {
  getAllContacts,
  deleteContact,
  createContact,
} from "../controllers/contactsControllers.js";
import { auth } from "../middlewares/auth.js";
import { isValidId } from "../middlewares/isValidId.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.delete("/:id", auth, isValidId, deleteContact);

contactsRouter.post(
  "/",
  auth,
  validateBody(createContactSchema),
  createContact
);

export default contactsRouter;
