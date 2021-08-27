const express = require("express")
const router = express.Router()
const {v4: uuidv4} = require("uuid")
const passport = require('passport')
const fs = require('fs')
const path = require('path')
const checkTrue="asdf";
const checkFalse="qwer";
module.exports = (database) => {
  router.get("/", async (req, res) => {
    if (!req.session.user) {

     res.render("index",{
       checkTrue}
       );
    }
    res.render("index",{
      checkFalse,
      email:req.session.user.email,});
  });
  router.get("/projects", async (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login")
    }
    let projects = await database.models.projectModel.find({
      user_id: req.session.user.id,
    })
    var fullUrl = `//${req.get("host")}`;
    projects = projects.map((project) => {
      return {
        name: project.name,
        url: project.url,
        project_id: project.project_id,
        user_id: project.user_id,
        fullUrl:fullUrl
      }
    })
    res.render("projects", {
      projects,
      email:req.session.user.email,
      
    })
  })
  router.post("/createProject", async (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login")
    }
   
   
    let id = uuidv4()
    let projects = new database.models.projectModel({
      name: req.body.name, 
      url: req.body.url,
      project_id: id,
      user_id: req.session.user.id,
      
    })
    await projects.save()
    res.json(projects)
  })

  router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
   

    res.redirect("/login")
  })
  router.delete("/delProject/:id", async (req, res) => {
    if (!req.session.user) {
      return res.redirect("/")
    }
    await database.models.projectModel.deleteOne({
      user_id: req.session.user.id,
      project_id: req.params.id,
    });
    await database.models.errorsModel.deleteMany({
      apikey: req.session.user.id,
      projectkey: req.params.id,
    });
    await database.models.performanceModel.deleteMany({
      apikey2: req.session.user.id,
      projectkey2: req.params.id,
    });

    res.json({
      success: true,
    })
  })

  router.get("/docs", async (req, res) => {
    if (!req.session.user) {

      res.render("docs",{
        checkTrue}
        );
     }
     res.render("docs",{
       checkFalse,email:req.session.user.email});
  });
  router.get("/errorMon", async (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    res.render("errorMon");
  })
  router.get("/performanceMon", async (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    res.render("performanceMon");
  })

  return router;
}
