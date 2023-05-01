const isLogin = async (req, res, next) => {
  try {
    if (req.session.userid) {
    } else {
      res.redirect("/signin");
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (req.session.userid) {
      res.redirect("/");
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isLogin,
  isLogout,
};
