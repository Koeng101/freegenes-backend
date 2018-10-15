'use strict'

const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({

  uuid: { type:String, required: true }, // All revisions keep the same uuid
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
  targetOrganism : String,
  sourceOrganism : String,
  partType : { type: String, required: true },
  sequence : { type: String, required: true },
  datName : String,
  datHash : String,

  toolkit : {type: String, ref: "Toolkit", required: true},
  tags : Array,

});

module.exports = mongoose.model('Part', modelSchema);

// Vast majority of the documentation should be in the dat, not stored locally in this file. 
