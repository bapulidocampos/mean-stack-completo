'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var FoodSchema=Schema({
text:String,
ingrediente:[],
file:String,
filev:String,
created_at:String,
user:{type:Schema.ObjectId,ref:'User'},
trainer:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('food',FoodSchema);

