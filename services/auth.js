const { is } = require("express/lib/request");

function isUserAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please login to view this resource');
  res.redirect('/users/login');
};

module.exports = {
  isUserAuthenticated,
}