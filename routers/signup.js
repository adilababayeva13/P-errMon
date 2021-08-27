const express = require("express")
const router = express.Router()
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcrypt")
var errors = []
module.exports = (database) => {
  router.get("/", (req, res) => {
    if (req.session.user) {
      return res.redirect("/")
    }
    res.render("signup", {message: errors})
  })
  router.post("/", async (req, res) => {
    if (req.session.user) {
      return res.redirect("/")
    }
    if (!req.body.firstname) {
      errors.push({msg: "Firstname is required"})
      res.redirect("/signup")
    }
    if (!req.body.lastname) {
      errors.push({msg: "Lastname is required"})
      res.redirect("/signup")
    }

    if (!req.body.email) {
      errors.push({msg: "Email is required"})
      res.redirect("/signup")
    }
    if (!req.body.password) {
      errors.push({msg: "Password is required"})
      res.redirect("/signup")
    }
    if (!req.body.passwordAgain) {
      errors.push({msg: "Please rewrite your password"})
      ;("Please rewrite your password")
      res.redirect("/signup")
    }
    if (req.body.passwordAgain != req.body.password) {
      errors.push({msg: "You wrote the password wrong"})
      res.redirect("/signup")
    }
    let {firstname, lastname, email, password} = req.body
    let Regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g
    if (!Regex.test(email)) {
      errors.push({msg: "Please write correct email address"})
      res.redirect("/signup")
    }
    let existsMail = await database.models.userModel.findOne({
      email,
    })
    if (existsMail) {
      errors.push({msg: "This email is exist"})
      res.redirect("/signup")
    }
    let id = uuidv4()
    let Password = await bcrypt.hash(password, 10)
    let user = new database.models.userModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: Password,
      id: id,
    })
    await user.save()
    req.session.user = {id, firstname, lastname, email}
    res.redirect("/login")
  })

  return router
}
