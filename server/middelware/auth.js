const isLoggedIn = async (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const isGuest = async (req, res, next) => {
  if (req.session.userId) {
    res.sendStatus(401);
  } else {
    next();
  }
};

module.exports = {
  isGuest,
  isLoggedIn,
};
