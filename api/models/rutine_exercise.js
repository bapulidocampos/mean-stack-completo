'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//instrucciones:[], ponerle la c

var Rutine_exerciseSchema=Schema({
instruciones:[],
ejercicios:[],
friends: [{ type : Schema.ObjectId, ref: 'Exercise' }],
created_at:String,
user:{type:Schema.ObjectId,ref:'User'},
entrenador:{type:Schema.ObjectId,ref:'User'},

});
module.exports=mongoose.model('Rutine_exercise',Rutine_exerciseSchema);

 


 
/*



'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Rutine_exerciseSchema=Schema({
text:String,
file:String,
filev:String,
vector:[], 
created_at:String,
user:{type:Schema.ObjectId,ref:'User'},
entrenador:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('Rutine_exercise',Rutine_exerciseSchema);







*/