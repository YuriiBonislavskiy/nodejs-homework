const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter =
    typeof favorite !== "undefined" ? { owner, favorite } : { owner };
  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(
    contactId,
    "-createdAt -updatedAt"
  ).populate("owner", "name email");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  const userId = req.user.id;
  const ownerId = result.owner.id;
  console.log(userId, "  ", ownerId);
  if (userId !== ownerId) {
    throw HttpError(403, "You do not have the right to carry out this action");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).populate("owner");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  const userId = req.user.id;
  const ownerId = result.owner.id;

  if (userId !== ownerId) {
    throw HttpError(403, "You do not have the right to carry out this action");
  }

  await Contact.findByIdAndRemove(contactId);

  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).populate("owner");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  const userId = req.user.id;
  const ownerId = result.owner.id;

  if (userId !== ownerId) {
    throw HttpError(403, "You do not have the right to carry out this action");
  }

  await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId).populate("owner");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  const userId = req.user.id;
  const ownerId = result.owner.id;

  if (userId !== ownerId) {
    throw HttpError(403, "You do not have the right to carry out this action");
  }

  await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
