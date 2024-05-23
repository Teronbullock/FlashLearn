
// Check if User has authorization to view page
module.exports.midCheckUsersAuth = (req, res, next) => {
  if ( req.session && req.session.userID ) {

    res.locals.userID = req.session.userID;
    return next();
  } else {
    let err = new Error('User must be logged in to view page.');
    err.status = 401;
    return next(err);
  }
}


// Check if User has authorization to redirect
module.exports.midCheckUserAuthRedirect = (req, res, next) => {
  if (req.params.userID == req.session.userID ) {

    return next();
  } else {
    let err = new Error('You are not authorized to view this page.');
    err.status = 403;
    return next(err);
  }
}