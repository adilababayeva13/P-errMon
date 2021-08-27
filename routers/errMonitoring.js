const express = require('express');
const { reset } = require('nodemon');
const {model} = require('mongoose');
const { Router } = require('express');
const path = require('path')
const cors = require('cors')
const router = express.Router()
const {v4: uuidv4} = require("uuid")
module.exports = (database,cors)=>{

    router.post('/',async(req,res)=>{
        const {error} = req.body
        let forprojectname = await database.models.projectModel.findOne({
            project_id:error.projectKey,
            user_id:error.userKey
        })
        let Model = await database.models.errorsModel.find({
            projectkey:error.projectKey,
            apikey:error.userKey
        })
      
        
        const projectname = forprojectname.name
        var colno = error.error.colno
        var filename = error.error.filename
        var lineno = error.error.lineno
        var message = error.error.message
        var tagName = error.error.tagName
        var currentSrc = error.error.currentSrc
        var cookieEnabled = error.navigator.cookieEnabled
        var deviceMemory = error.navigator.deviceMemory
        var hardwareConcurrency = error.navigator.hardwareConcurrency
        var language = error.navigator.language
        var languages = error.navigator.languages
        var onLine = error.navigator.onLine
        var userAgent = error.navigator.userAgent
        var vendor = error.navigator.vendor
        var apikey = error.userKey
        var projectkey = error.projectKey
        var platform = error.navigator.platform
        var plugins = error.navigator.plugins
        var appName = error.navigator.appName
        var appVersion = error.navigator.appVersion
        var appCodeName = error.navigator.appCodeName
   
         var errorKey=uuidv4();
        if(Model.length!=0){
                const result2 = message.replace(" ", "-");
            for(let i=0;i<Model.length;i++){
                let result1 = Model[i].message.replace(" ", "-");
                if(result1==result2){
                return;
            }
            }      
}
        let mainError = await new database.models.errorsModel({
            colno,
            tagName,
         currentSrc,
            filename, 
            lineno, 
            message, 
            projectname,
            date:Date.now(),
            cookieEnabled, 
            deviceMemory, 
            hardwareConcurrency, 
            language, 
            languages, 
            onLine, 
            userAgent, 
            vendor, 
            apikey, 
            platform, 
            plugins, 
            appName, 
            appVersion, 
            appCodeName,
            projectkey,
            errorKey
        })
        await mainError.save()
   
    })
    

    
return router
}