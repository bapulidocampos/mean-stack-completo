'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TipsalimentacionSchema=Schema({
text:String,
file:String,
filev:String,
vector:[], 
created_at:String,
user:{type:Schema.ObjectId,ref:'User'},
entrenador:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('Tipsalimentacion',TipsalimentacionSchema);

