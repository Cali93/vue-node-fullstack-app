// middleware function to check for logged in users
exports.sessionChecker = (req, res, next) => {
  if (req.session.userId && req.cookies.session_id) {
    next();
  } else {
    res.json({ success: false, error: 'Unauthorized' });
  }
};
