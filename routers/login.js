const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var errors = [];
module.exports = (database) => {
  router.get("/", (req, res) => {
    if (req.session.user) {
      return res.redirect("/");
    }
    req.session.destroy();
    res.render("login", { message: errors });
  });

router.post("/", async (req, res) => {
    if (!req.body.email) {
      errors.push({ msg: "Email is required" });
      res.redirect("/login");
    }
    if (!req.body.password) {
      errors.push({ msg: "Password is required" });
      res.redirect("/login");
    }
    let { email, password } = req.body;

    let user = await database.models.userModel.findOne({
      email: email,
    });
    if (!user) {
      errors.push({ msg: "This user is not exist" });
      res.redirect("/login");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.push({ msg: "This user is not exist" });
      res.redirect("/login");
    }
    req.session.user = user;
    res.redirect("/");
  });
  return router;
};
