const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  adminRequired: (req, res, next) => {
    if (process.env.NODE_ENV === "test") {
      next();
    } else if (!req.token) {
      res.status(401).json({
        message: "You do not have access."
      });
      next();
    } else {
      jwt.verify(req.token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          console.log(error);
          res.status(401).json({
            message: "You do not have access."
          });
          next();
        } else {
          let userId = decoded.sub;
          User.findOne({ _id: userId }).exec((error, user) => {
            if (error || !user) {
              res.status(401).json({
                message: "You do not have access."
              });
              next();
            } else {
              if (user.isAdmin) {
                res.locals.currentUser = user;
                next();
              } else {
                res.status(401).json({
                  message:
                    "You need to be an Admin to perform this action on the API."
                });
                next();
              }
            }
          });
        }
      });
    }
  }
}