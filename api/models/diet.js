'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var DietSchema=Schema({
text:String,
file:String,
filev:String,
lunes:[],
martes:[],
miercoles:[],
jueves:[],
viernes:[],
created_at:String,
user:{type:Schema.ObjectId,ref:'User'},
trainer:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('Diet',DietSchema);

