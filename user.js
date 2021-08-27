const User=require("./models/userModel.js");
const bcrypt = require("bcrypt");
module.exports={
    resource:User,
    options:{
      properties:{
        password:{
          type:"password",
          isVisible:false
        },
        passTwin:{
          type:"password",
          isVisible:{
            edit:true,
            list:false,
            show:false,
            filter:false
          }
        }
      },
      actions:{
        new:{
          before:async (request)=>{
            if(request.method=="post"){
              const {passTwin,...others}=request.payload;
              if(passTwin){
                const encrypted=bcrypt.hashSync(passTwin,10);
                return{
                  ...request,
                  payload:{
                    ...others,
                    password:encrypted
                  }
                }
              }
            }
            return request;
          },
          after:async (request)=>{
            if(!request.record.params.passTwin){
              request.record.errors.passTwin={
                message:"Password is required",
                type:"required"
              }
            }
            return request;
          }
        },
        edit:{
          before:async (request)=>{
            if(request.method=="post"){
              const {passTwin,...others}=request.payload;
              if(passTwin){
                const encrypted=bcrypt.hashSync(passTwin,10);
                return{
                  ...request,
                  payload:{
                    ...others,
                    password:encrypted
                  }
                }
              }
            }
            return request;
          }
        }
      }
  
    }
  }