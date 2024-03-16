import express from "express";
import {
  getAllContacts,
  deleteContact,
  createContact,
} from "../controllers/contactsControllers.js";
import { auth } from "../middlewares/auth.js";

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.delete("/:id", auth, deleteContact);

contactsRouter.post("/", auth, createContact);

export default contactsRouter;
