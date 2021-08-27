const Mongoose = require("mongoose");
const errorSchema = new Mongoose.Schema({
colno : {
  type: Number  
},
filename : {
  type:String
},
tagName : {
  type:String
},
currentSrc : {
  type:String
},
lineno : {
  type:Number
},
message : {
  type:String
},
cookieEnabled : {
  type:Boolean
},
deviceMemory : {
  type:Number
},
hardwareCincurrency : {
  type:Number
},
language : {
  type:String
},
languages : {
  type:Array
},
onLine : {
  type:Boolean
},
projectname:{
  type:String
},
date:{
  type:Date
},
userAgent : {
  type:String
},
vendor : {
  type:String
},
apikey : {
  type:String
},
projectkey : {
  type:String
},
platform : {
  type:String
},

appName : {
  type:String
},

appVersion : {
  type:String
},
appCodeName : {
  type:String
},
errorKey:{
  type:String
}
});

module.exports = Mongoose.model("errorsModel", errorSchema, "ERROR_COLLECTION");
