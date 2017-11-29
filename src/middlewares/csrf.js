import uuid from 'uuid';

export default function (req, res, next) {
  /* eslint-disable no-reassign */
  req.session.csrf = req.session.csrf || uuid.v4();
  /* eslint-enable no-reassign */

  next();
}
