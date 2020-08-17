const mongoose = require("mongoose");

const isEmpty = require("lodash/isEmpty");

const Note = mongoose.model("Note");

module.exports.note = async (req, res) => {
  const { note } = req.body;

  if (note == "") {
    return res.status(422).send({ error: "Note is Empty" });
  }
  try {
    const noteObj = new Note({ note });
    await noteObj.save();
  } catch (err) {
    return res.status(422).send({ error: "Can't create a Note" });
  }
};
