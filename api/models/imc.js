
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ImcSchema=Schema({
peso:Number,
altura:String,
imc:String,
mbasal:String,
tmb:String,
actividad:String,
file:String,
filev:String,
//vector:[], 
created_at:String,
created_at2:String,
user:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('Imc',ImcSchema);

/* 
'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ImcSchema=Schema({
text:String,
name:String,
category:String,
file:String,
filev:String,
created_at:String,
user:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('Imc',ImcSchema);
*/
