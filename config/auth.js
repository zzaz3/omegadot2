import User from '../models/User';

exports.roleAuth = function (roles) {
  return function (req, res, next) {

    if (req.user) {
      let user = req.user;

      User.findById(user._id, function (err, foundUser) {

        if (err) {
          res.status(422).json({ error: 'No user found.' });
          return next(err);
        }

        if (roles.indexOf(foundUser.role) > -1) {
          return next();
        }

        res.status(401).json({ error: 'You are not authorized to view this content' });
        return next('Unauthorized');

      });
    }
    else {
    return res.send(JSON.stringify({})); }
  }
}
