'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var UserSchema=Schema({
name:String,
surname:String,
date_birth:String,
nick:String,
sexo:String,
allergy:[],
email :String,
password:String,
role:String,
image:String
});
//modelo va hacer User, y su esquema va ser Userschema
module.exports=mongoose.model('User',UserSchema);



