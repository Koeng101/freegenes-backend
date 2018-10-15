'use strict'

const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({

  uuid: { type: String, required: true}, // All revisions keep the same uuid
  revision: Number, default: 0,
  revisionNotes: String, // Written by admin for the new revision

  // Metadata
  createdAt    : { type: String, default: new Date() },
  updatedAt    : { type: String, default: new Date() },
  name         : { type: String, required: true },
  description  : { type: String, required: true },
  status       : { type: String, default: "Pending" },
  author : { type: String, ref: "User", required: true },
  authorAffiliation : String,
  authorEmail : { type: String, required: true },
  authorName : { type: String, required: true },
  authorOrcid : String,

  // Information about this part
  datName : String,
  datHash : String,

  tags : Array,

});

module.exports = mongoose.model('Toolkit', modelSchema);

// Vast majority of the documentation should be in the dat, not stored locally in this file. 
