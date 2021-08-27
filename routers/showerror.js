const express = require('express');
const {model} = require('mongoose')
const router = express.Router()

module.exports=(database)=>{
        router.get('/',async(req,res)=>{
            if(!req.session.user){
                res.redirect('/login')
            }
            const unique_id = req.session.user.id 
            let errordata  = await  database.models.errorsModel.find({
                apikey:unique_id
            })
            let projectdata= await database.models.projectModel.find({
                user_id:req.session.user.id 
            })
            
            let errarr = await errordata.map(errs=>{
                return{
                    message:errs.message,
                    projectname : errs.projectname,
                    projectkey : errs.projectkey,
                    userkey :unique_id ,
                    errorKey:errs.errorKey,
                    
                    
                }
            })
            let projects = await projectdata.map(pro=>{
                return{
                    name:pro.name,
                }
            })
        
      
            if(errarr){
                res.render('showerrors',{
                    email:req.session.user.email,
                    errarr,
                    projects
                    
                })
            }else{
                res.render('showerrors',{email:req.session.user.email})
            }
        })    
    router.get('/:userkey/:projectkey/:errorKey/', async(req,res)=>{
        const {userkey,projectkey,errorKey} = req.params
            let data = await database.models.projectModel.findOne({
                user_id:userkey,
                project_id:projectkey,
                
            })
            let errordata = await database.models.errorsModel.findOne({
                apikey : userkey,
                projectkey : projectkey,
                errorKey:errorKey
            })
            console.log(errordata.__v)
            console.log(data.platform)
            res.render('detailserrmonitoring',{
                errordata,
                     platform:data.platform,
                     "tagname":errordata.tagName ,
                     "currentSrc":errordata.currentSrc ,
                "colno" : errordata.colno ,
                "filename" :errordata.filename ,
                "lineno" :errordata.lineno ,
                "message" :errordata.message ,
            "projectname" :errordata.projectname ,
                    "date" :errordata.date ,
            "cookieEnabled" : errordata.cookieEnabled ,
            "deviceMemory" :errordata.deviceMemory ,
                "language" :errordata.language ,
                "onLine" :errordata.onLine ,
            "userAgent" :errordata.userAgent ,
                "vendor" :errordata.vendor ,
                "apikey" :errordata.apikey ,
                "platform" :errordata.platform ,
                "appName" :errordata.appName ,
            "appVersion" :errordata.appVersion ,
            "appCodeName" :errordata.appCodeName ,
            "projectkey" :errordata.projectkey ,
                    "__v" :errordata.__v ,
            })
    })

  

    router.delete('/deleteerror/:errorID',async(req,res)=>{
        await database.models.errorsModel.deleteOne({
            errorKey: req.params.errorID,
          })
          res.json({
            success: true,
          })
    
    })

 return router
}