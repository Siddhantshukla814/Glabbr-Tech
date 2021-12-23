import asyncHandler from "express-async-handler";
import Contacts from "../models/contactModel.js";

// @desc Fetch all contacts
// @route GET /api/contacts
// @access Public

const getContacts = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Contacts.countDocuments({});
  const contacts = await Contacts.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (contacts) {
    res.json({ contacts, page, pages: Math.ceil(count / pageSize) });
  } else {
    // res.status(404).json({ message: "Product not found" });
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Fetch favourite contacts
// @route GET /api/contacts/favourite
// @access Public

const getFavouriteContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find({});

  if (contacts) {
    const favouriteContacts = contacts.filter((x) => x.isFav === true);

    res.json(favouriteContacts);
  } else {
    // res.status(404).json({ message: "Product not found" });
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Fetch single contact
// @route GET /api/contacts/:id
// @access Public

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);

  if (contact) {
    await contact.remove();
    res.json({ message: "Contact removed" });
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

// @desc Create a contact
// @route POST /api/contacts
// @access public

const createContact = asyncHandler(async (req, res) => {
  const { image, name, username, status, location, tags } = req.body;

  const tagsarr = tags.split(",");

  const contact = new Contacts({
    image: image,
    name: name,
    username: username,
    status: status,
    location: location,
    tags: tagsarr,
  });

  const createdContact = await contact.save();
  res.status(201).json(createdContact);
});

// @desc Update a contact
// @route PUT /api/contact/:id
// @access public

const updateContact = asyncHandler(async (req, res) => {
  const { image, name, username, status, isFav, location, tags } = req.body;

  const tagsarr = tags && tags.split(",");

  const contact = await Contacts.findById(req.params.id);

  if (contact) {
    contact.image = image || contact.image;
    contact.name = name || contact.name;
    contact.username = username || contact.username;
    contact.status = status || contact.status;
    contact.isFav = isFav;
    contact.location = location || contact.location;
    contact.tags = tagsarr || contact.tags;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  getFavouriteContacts,
};
