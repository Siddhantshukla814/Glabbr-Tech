import express from "express";

import {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  getFavouriteContacts,
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getContacts).post(createContact);
router.route("/favourite").get(getFavouriteContacts);
router
  .route("/:id")
  .get(getContactById)
  .delete(deleteContact)
  .put(updateContact);

export default router;
