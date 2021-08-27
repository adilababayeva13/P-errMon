const express = require('express');
const {model} = require('mongoose')
const router = express.Router();
var sum1=0;
var sum2=0;
var up1;
var up2;
var down1;
var down2;
module.exports=(database)=>{
        router.get('/',async(req,res)=>{
            if(!req.session.user){
                res.redirect('/login')
            }
            const id = req.session.user.id 
            let data  = await  database.models.projectModel.find({
                user_id:id
            })
            let dataarr =  data.map(projs=>{
                return {
                    projname:projs.name,
                    project_id:projs.project_id,
                    id:projs.user_id,

                }
            })
           
            res.render('showperformance',{
                info :dataarr,
                email:req.session.user.email,
                
            })
        })    
        router.get('/:userkey/:projectkey',async(req,res)=>{
            const {userkey,projectkey} = req.params
            
            let data = await database.models.projectModel.findOne({
                user_id:userkey,
                project_id:projectkey
            })
            let errors = await database.models.errorsModel.find({
                projectkey:projectkey,
                apikey:userkey
            });
           
            let performancedata = await database.models.performanceModel.find({
                apikey2 : userkey,
                projectkey2 : projectkey
            })
           let len=performancedata.length;
           var error=errors.length;
           let perr = await performancedata.map(per=>{
            return{
                response:per.response/1000,
               connect:per.connect/1000,
               hour:per.date.getHours(),
               min:per.date.getMinutes()
                }
        });
            for (let i=0; i<performancedata.length; i++){
                let num = parseInt(performancedata[i].response);
                sum1=sum1+num;
               
            }
            for (let i=0; i<performancedata.length; i++){
                let num = parseInt(performancedata[i].connect);
                sum2=sum2+num;
               
            }
          
            const response=(sum1/len).toString().slice(0,4);
            const connect=(sum2/len).toString().slice(0,4);
            if((sum1/len<200)&&(sum2/len<250)){
                up1="up";
                up2="up";
                res.render('detailsperformance',{
                    performancedata,
                    name:data.name,
                    response:response,
                    connect:connect,
                    up1:up1,   
                    up2: up2, 
                    err:error,   
                    perr:perr                        
                })
               }
               if((sum1/len>200)&&(sum2/len>250)){
                down1="up";
               down2="up";
                res.render('detailsperformance',{
                    performancedata,
                    name:data.name,
                    response:response,
                    connect:connect,
                    down1:down1,   
                    down2: down2,               
                    err:error,   
                    perr:perr              
                })
               }
               if((sum1/len<200)&&(sum2/len>250)){
               up1="up";
               down2="up";
                res.render('detailsperformance',{
                    performancedata,
                    name:data.name,
                    response:response,
                    connect:connect,
                   up1:up1,   
                    down2: down2,   
                    err:error,            
                    perr:perr                 
                })
               }
               if((sum1/len>200)&&(sum2/len<250)){
                down1="up";
                up2="up";
                 res.render('detailsperformance',{
                     performancedata,
                     name:data.name,
                     response:response,
                     connect:connect,
                    down1:down1,   
                     up2: up2,  
                     err:error,   
                     perr:perr                           
                 })
                }
             
        
           
        })    
    return router;
}