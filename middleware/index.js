module.exports.loggedOut = (req, res, next) => {
  if (req.session && req.session.userId) {
    res.redirect('/welcome');
  }
  next();
}

module.exports.requireslogin = (req, res, next) => {
  console.log(req.session);
  if ( req.session && req.session.userId ) {
    next();
  } else {
    let err = new Error('User must be loggin to view page.');
      err.status = 401;
      return next(err);
  }

}