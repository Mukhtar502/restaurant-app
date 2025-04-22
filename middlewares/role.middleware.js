async function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message:
        "You can't perform this action because you are not logged in as an admin",
    });
  }
  next();
}
module.exports = isAdmin;
