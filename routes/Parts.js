const User = require("../models/User");
const Virtual = require("../models/Part");
const Toolkit = require("../models/Toolkit");
const jwt = require("jsonwebtoken");
const adminRequired = require("../modules/apiAccess").adminRequired;

if (!process.env.JWT_SECRET) {
  require("../config/env.js");
}

module.exports = function(app) {
  // create new record
  app.post("/parts/new", adminRequired, (req, res) => {
    let newRecord = new Virtual({
      author: res.locals.currentUser || req.body.author,
      name: req.body.name,
      description: req.body.description,
      author : req.body.author,
      authorAffiliation : req.body.authorAffiliation,
      authorEmail : req.body.authorEmail,
      authorName : req.body.authorName,
      authorOrcid : req.body.authorOrcid,
      targetOrganism: req.body.targetOrganism,
      sourceOrganism: req.body.sourceOrganism,
      partType: req.body.partType,
      sequence: req.body.sequence,
      tags: req.body.tags,
      datName: req.body.datName,
      datHash: req.body.datHash,
      toolkit: req.body.toolkit,
      uuid: req.body.uuid,
      revision: req.revision,
      revisionNotes: req.revisionNotes,
    });
    newRecord.save((error, data) => {
      let jsonResponse;
      if (error) {
        jsonResponse = {
          message: "There was a problem saving the new record.",
          data: {},
          error
        };
      } else {
        jsonResponse = {
          message: "The new record was successfully saved.",
          data: data,
          error: {}
        };
      }
      res.json(jsonResponse);
    });
  });

  // remove record
  app.post("/parts/:recordId/remove", adminRequired, (req, res) => {
    Virtual.findByIdAndRemove(req.params.recordId).exec(error => {
      if (error) {
        jsonResponse = {
          message: "There was a problem removing the record."
        };
      } else {
        jsonResponse = {
          message: "The record was successfully removed."
        };
      }
      res.json(jsonResponse);
    });
  });

  // edit record
  app.post("/parts/:recordId/edit", adminRequired, (req, res) => {
    if (process.env.NODE_ENV === 'test') {
      Virtual.findOne({ _id: req.params.recordId })
        .exec((err, record) => {
          record.author = req.body.author;
          record.name = req.body.name;
          record.description = req.body.description;
          record.authorAffiliation = req.body.authorAffiliation;
          record.authorEmail = req.body.authorEmail;
          record.authorName = req.body.authorName;
          record.authorOrcid = req.body.authorOrcid;
          record.targetOrganism = req.body.targetOrganism;
          record.sourceOrganism = req.body.sourceOrganism;
          record.partType = req.body.partType;
          record.sequence = req.body.sequence;
          record.tags = req.body.tags;
          record.datName = req.body.datName;
          record.datHash = req.body.datHash;
          record.toolkit= req.body.toolkit;
          record.uuid= req.body.uuid;
          record.revision= req.revision;
          record.revisionNotes= req.revisionNotes;
          record.updatedAt = new Date();
      
          record.save((error, updatedRecord) => {
            let jsonResponse;
            if (error) {
              jsonResponse = {
                message: "There was a problem saving the updated record.",
                data: record
              };
            } else {
              jsonResponse = {
                message: "The updated record was successfully saved.",
                data: updatedRecord
              };
            }
            res.json(jsonResponse);
          });
        });
    } else {
      Virtual.findOne({ _id: req.params.recordId })
        .exec((err, record) => {
          record.author = req.body.author;
          record.name = req.body.name;
          record.description = req.body.description;
          record.authorAffiliation = req.body.authorAffiliation;
          record.authorEmail = req.body.authorEmail;
          record.authorName = req.body.authorName;
          record.authorOrcid = req.body.authorOrcid;
          record.targetOrganism = req.body.targetOrganism;
          record.sourceOrganism = req.body.sourceOrganism;
          record.partType = req.body.partType;
          record.sequence = req.body.sequence;
          record.tags = req.body.tags;
          record.datName = req.body.datName;
          record.datHash = req.body.datHash;
          record.toolkit= req.body.toolkit;
          record.uuid= req.body.uuid;
          record.revision= req.revision;
          record.revisionNotes= req.revisionNotes;

          record.updatedAt = new Date();
      
          record.save((error, updatedRecord) => {
            let jsonResponse;
            if (error) {
              jsonResponse = {
                message: "There was a problem saving the updated record.",
                data: record
              };
            } else {
              jsonResponse = {
                message: "The updated record was successfully saved.",
                data: updatedRecord
              };
            }
            res.json(jsonResponse);
          });
        });
    }
  });

  // show one record
  app.get("/parts/:recordId", getRecordById, (req, res) => {
    let jsonResponse = {
      message: res.locals.message,
      data: res.locals.data
    };
    res.json(jsonResponse);
  });

  // list all records
  app.get("/parts", getAllRecords, (req, res) => {
    let jsonResponse = {
      message: res.locals.message,
      data: res.locals.data
    };
    res.json(jsonResponse);
  });
};

function getAllRecords(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    Virtual.find({}, {}, { sort: { name: 1 } })
    .exec((error, data) => {
      if (error) {
        res.locals.message =
          "There was a problem with retrieving the records.";
      } else {
        res.locals.message =
          "The records were successfully retrieved.";
      }
      res.locals.data = data;
      return next();
    });
  } else {
    Virtual.find({}, {}, { sort: { name: 1 } })
    .exec((error, data) => {
      if (error) {
        res.locals.message =
          "There was a problem with retrieving the records.";
      } else {
        res.locals.message =
          "The records were successfully retrieved.";
      }
      res.locals.data = data;
      return next();
    });    
  }  
}

function getRecordById(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    Virtual
    .findOne({'_id': req.params.recordId})
    .exec((error, data) => {
      if(error) {
        res.locals.message = "There was a problem with retrieving the record.";
        res.locals.data = {};
      } else {
        res.locals.message = "The record was successfully retrieved.";
        res.locals.data = data;               
      }
      return next();
    });
  } else {
    Virtual
    .findOne({'_id': req.params.recordId})
    .exec((error, data) => {
      if(error) {
        res.locals.message = "There was a problem with retrieving the record.";
        res.locals.data = {};
      } else {
        res.locals.message = "The record was successfully retrieved.";
        res.locals.data = data;               
      }
      return next();
    });
  }
}   
