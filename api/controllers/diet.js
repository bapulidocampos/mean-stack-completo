'use strict'
var path=require('path');
var fs=require('fs');
var moment=require('moment');
var mongoosePaginate=require('mongoose-pagination');
var Publication=require('../models/publication');
var User=require('../models/User');
var Diet=require('../models/diet');
var Food=require('../models/food');
var Comentary=require('../models/comentary');
function probando (req,res){
	res.status(200).send({
		message:'hola desde el controlador publication'
	});
}




function savePublication(req,res){
	var params=req.body;

	if(!params.text) return res.status(200).send({message:'Debes enviar un texto'});

if(params.lunes.length<3){
	return res.json({ success: false, msg: 'Debes llenar 3 comidas del lunes' });
	//return res.status(200).send({message:'Debes llenar 3 comidas del dia'});
}

if(params.martes.length<3){
	return res.json({ success: false, msg: 'Debes llenar 3 comidas del martes' });
}
if(params.miercoles.length<3){
		return res.json({ success: false, msg: 'Debes llenar 3 comidas del miercoles' });
}
if(params.jueves.length<3){
		return res.json({ success: false, msg: 'Debes llenar 3 comidas del jueves' });
}
if(params.viernes.length<3){
		return res.json({ success: false, msg: 'Debes llenar 3 comidas  dia' });
}

var diet=new Diet();

diet.text=params.text;
diet.file='null';
diet.filev='null';
//publication.comentario=params.comentario;

diet.trainer=params.trainer;
diet.user=params.user;
diet.created_at=moment().unix();
console.log(params.vector);
//diet.vector=params.vector;
diet.lunes=params.lunes;


diet.martes=params.martes;
diet.miercoles=params.miercoles;
diet.jueves=params.jueves;
diet.viernes=params.viernes;


console.log("aqui va los vectores de la semana");
console.log(params.lunes);
console.log("longitud del vector de lunes"+params.lunes.length);
console.log(params.martes);
//publication.comentario=params.comentario;
diet.save((err,publicationStored)=>{
	if(err)return res.status(500).send({message:'error al guarda la publicacion'});
	if(!publicationStored)return res.status(404).send({message:'la publicacion no se ha guardado'});
return res.status(200).send({
	publication:publicationStored
});

});


}


//BUSCAR LAS PUBLICACIONES DE LOS USUARIOS QUE SEGUIMOS

function getPublications(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
Follow.find({user:req.user.sub}).populate('followed').exec((err,follows)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});

var follow_clean=[];
follows.forEach((follow)=>{
	//para añadir el id pero estoy trayendo completo el objeto
follow_clean.push(follow.followed);
});

//añadimos nuestras publicaciones 
follow_clean.push(req.user.sub);


console.log(follow_clean);
//buscar con $in buscar dentro de un array , buscar las coincidencia
//buscar todos los documentos cuyo usuario este contenido en el array follow_clean
//sort ordena las publicaciones de mas nuevas a mas viejas
Publication.find({user:{"$in":follow_clean}}).sort('-created_at').populate('user').
paginate(page,itemsPerPag,(err,publications,total)=>{
if(err)return res.status(500).send({message:'error al devolver publicaciones'});
if(!publications)return res.status(404).send({message:'No hay publicaciones'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
	publications

});

});

});




}

//////-----------------------------------------------


function getPublicatione(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
Publication.find({}).exec((err,publicationess)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});

var follow_clean=[];
publicationess.forEach((followee)=>{
	//para añadir el id pero estoy trayendo completo el objeto
follow_clean.push(followee.user);
});

//añadimos nuestras publicaciones 
follow_clean.push(req.user.sub);


console.log(follow_clean);
//buscar con $in buscar dentro de un array , buscar las coincidencia
//buscar todos los documentos cuyo usuario este contenido en el array follow_clean
//sort ordena las publicaciones de mas nuevas a mas viejas
Comentary.find({user:{"$in":follow_clean}}).sort('-created_at').populate(' user').
paginate(page,itemsPerPag,(err,publications,total)=>{
if(err)return res.status(500).send({message:'error al devolver publicaciones'});
if(!publications)return res.status(404).send({message:'No hay publicaciones'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
	publications

});

});

});




}


/////------------------------------------------------
//-------------------------------------------------------------------------


function getPublicationex(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
//Comentary.find({user:{"$in":follow_clean}}).sort('-created_at').populate('user').
//paginate(page,itemsPerPag,(err,publications,total)=>{

Publication.find({}).sort('-created_at').populate('user').
paginate(page,itemsPerPag,(err,publicationess,total)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
publicationess

});




});




}


////////////////////////getPublicationsexx en ruta
function getPublicationexx(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
//Comentary.find({user:{"$in":follow_clean}}).sort('-created_at').populate('user').
//paginate(page,itemsPerPag,(err,publications,total)=>{

//Comentary.find({}).sort('-created_at').populate({path:"user",populate:{path:"comentario"}}).paginate
//(page,itemsPerPag,(err,comentarys,total)=>{
//	Comentary.find({}).sort('-created_at').populate('user, publicatione').paginate
//(page,itemsPerPag,(err,comentarys,total)=>{


Diet.find({trainer:req.user.sub,user:req.params.user}).sort('-created_at').populate('user trainer').
paginate(page,itemsPerPag,(err,publications,total)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
//comentarys,
publications

});
});



//});


}

/////// ver mi propio perfil mis dieta que me dejaron



function getPublicationexxt(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
//Comentary.find({user:{"$in":follow_clean}}).sort('-created_at').populate('user').
//paginate(page,itemsPerPag,(err,publications,total)=>{

//Comentary.find({}).sort('-created_at').populate({path:"user",populate:{path:"comentario"}}).paginate
//(page,itemsPerPag,(err,comentarys,total)=>{
//	Comentary.find({}).sort('-created_at').populate('user, publicatione').paginate
//(page,itemsPerPag,(err,comentarys,total)=>{


Diet.find({user:req.user.sub}).sort('-created_at').populate('user trainer').
paginate(page,itemsPerPag,(err,publications,total)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
//comentarys,
publications

});
});



//});


}
/////////////////////////////////



////////////////////////getPublicationsexxs en ruta///////////////////////
function getPublicationexxs(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
//Comentary.find({user:{"$in":follow_clean}}).sort('-created_at').populate('user').
//paginate(page,itemsPerPag,(err,publications,total)=>{

Comentary.find({}).sort('-created_at').populate('user ').paginate
(page,itemsPerPag,(err,publications,total)=>{

Publication.find({}).sort('-created_at').populate('user').
paginate(page,itemsPerPag,(err,publications,total)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
//comentarys,
publications

});
});



});


}




//-------------------------------------------------------------------------


////////////////////
//TODAS LAS PUBLICACIONES QUE TIENE SOLO UNA PERSONA
//-----------------------------------------------
// getPublicationsUser  por alguna razon no me deja este nombre

function getPublicationss(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var user=req.user.sub;
if(req.params.user){
 user=req.params.user;
}
var itemsPerPag=4;
//var ext_split=file_name.split('\.');
//var file_ext=ext_split[1];
//console.log(publications[0]);
Publication.find({user:user}).sort('-created_at').populate('user').
paginate(page,itemsPerPag,(err,publications,total)=>{
if(err)return res.status(500).send({message:'error al devolver publicaciones'});
if(!publications)return res.status(404).send({message:'No hay publicaciones'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
	publications

});

});





}


//-----------------------------------------

function getPublication(req,res){

	var publicationId=req.params.id;
	Publication.findById(publicationId,(err,publication)=>{
if(err)return res.status(500).send({message:'error al devolver publicaciones'});
if(!publication)return res.status(500).send({message:'No existe la publicacion'});
return res.status(200).send({publication});

	});
}

function deletePublication(req,res){
	console.log("backend dieta ");
	
var publicationId=req.params.id;
Diet.find({'trainer':req.user.sub,'_id':publicationId}).remove(err=>{
if(err)return res.status(500).send({message:'error al borrar publicacion'});
//if(!publicationRemoved)return res.status(500).send({message:'No se ha borrado la publicacion'});
return res.status(200).send({message:'publicacion eliminada'});

	});

}



//subir imagen AVATAR DE USUARIO

function uploadImage(req,res){
var publicationId=req.params.id;

//cuando abrimo la req hay una propiedad file
//si eexiste file o estamos enviando algiun fichero
if(req.files){
	//es todo el archivo que hemos subido
	console.log("por aquuiiiii   "+req.files);
var file_path=req.files.image.path;
console.log("file_path aquii1 2 "+file_path);
//separa el vector por //
var file_split=file_path.split('\\');
//squedaria 0(upload) 1(user) 2(la ruta o nombre del fichero)
console.log(file_split);
//para guardar el nombre del fichero
var file_name=file_split[2];
console.log(file_name);
//sacar que tipo es archivo .
//si es una imagen o otro tipo de archivo
//punto es un caracter especial debo usar la barra invertida
var ext_split=file_name.split('\.');
var file_ext=ext_split[1];
console.log(ext_split);
console.log(file_ext);


		if(file_ext=='png'||file_ext=='jpg'||file_ext=='jpeg'||file_ext=='gif'||file_ext=='mp4'){
			

			Publication.findOne({'user':req.user.sub,'_id':publicationId}).exec((err,publication)=>{

				if(publication){


					if(file_ext=='mp4'){

						Publication.findByIdAndUpdate(publicationId,{filev:file_name},{new:true},(err,publicationUpdated)=>{
				if(err) return res.status(500).send({message:'Error en la peticion'});
if(!publicationUpdated) return res.status(500).send({message:'No se ha podido actualizar el usuario'});
return res.status(200).send({publication:publicationUpdated,file_ext});
			});

					}
else{

	Publication.findByIdAndUpdate(publicationId,{file:file_name},{new:true},(err,publicationUpdated)=>{
				if(err) return res.status(500).send({message:'Error en la peticion'});
if(!publicationUpdated) return res.status(500).send({message:'No se ha podido actualizar el usuario'});
return res.status(200).send({publication:publicationUpdated,file_ext});
			});

}

				}
				else{
					return removeFileOfUpload(res,file_path,'No tienes permiso para actualizar esta publicacion');
				}

			});

		
		
		}
			else{
//					eliminr el fichero
			return removeFileOfUpload(res,file_path,'la extension no valida');
			}


	}
	else{
		return res.status(200).send({message:'no se han subidos archivos o imagenes'});
	}

}

function getImageFile(req,res){
	//recoger por la url
	//el nombre de fichero que le vamos a pasar por la url
	//va recibir el metodo y va sacar esa imagen del sistemas de fichero
	var image_file=req.params.imageFile;
	//va tener el path de las imagenes de usuario
	var path_file='./uploads/publications/'+image_file;
	//comprabamos si el fichero existe
	fs.exists(path_file,(exists)=>{
		if(exists){
			//metodo de express para respuestas
			//devolver el fichero en crudo
			res.sendFile(path.resolve(path_file));
		}
		else{
			res.status(200).send({message:'no existe la imagen'});
		}
	});

}
function removeFileOfUpload(res,file_path,message){
	fs.unlink(file_path,(err)=>{
	return res.status(200).send({message:message});

});
}
function uploadcomentarioo(req,res){
var publicationId=req.params.id;
var comenta=req.comentario;

//cuando abrimo la req hay una propiedad file
//si eexiste file o estamos enviando algiun fichero
if(req.comentario){
	//es todo el archivo que hemos subido
	console.log("por aquuiiiii   "+req.comentario);



	
			

			Publication.findOne({'user':req.user.sub,'_id':publicationId}).exec((err,publication)=>{

				if(publication){


					

						Publication.findByIdAndUpdate(publicationId,{comentario:comenta},{new:true},(err,publicationUpdated)=>{
				if(err) return res.status(500).send({message:'Error en la peticion'});
if(!publicationUpdated) return res.status(500).send({message:'No se ha podido actualizar el usuario'});
return res.status(200).send({publication:publicationUpdated,comenta});
			});

					


				}
				else{
					return removeFileOfUpload(res,file_path,'No tienes permiso para actualizar esta publicacion');
				}

			});

		
		
		
			

	}
	else{
		return res.status(200).send({message:'no se han subidos archivos o imagenes'});
	}

}

function uploadcomentario(req,res){
//var publicationId=req.params.id;
console.log(publicationsvector);
console.log(req.publicationsvector);
console.log(req.publicationsvector[0]);
var comenta=req.comentario;
console.log(comenta);
console.log(req.comentario);





}
//traigo todos los food 
function getmyusercliente2(req,res){
	var follow_clean2=[];
	console.log("aqui va getmyusercliente ñiños ");
console.log(req.params.user);



User.find({_id:req.params.user}).exec((err,followsalergia)=>{
  if(err) return res.status(500).send({message: 'Error en el servidor'});
 
        if(!followsalergia) return res.status(404).send({message: 'No sigues ningun usuario'});


  //return res.status(200).send({followsalergia});
console.log(followsalergia);
console.log("aqui va ");
//console.log(followsalergia.allergy[0]);


});



//follow_clean2[1]="leche";
follow_clean2[0]="mani";
console.log(follow_clean2);



Food.find({ingrediente:{"$nin":follow_clean2}}).exec((err,follows)=>{
  if(err) return res.status(500).send({message: 'Error en el servidor'});
 
        if(!follows) return res.status(404).send({message: 'No sigues ningun usuario'});

  return res.status(200).send({follows});

});



}


function getmyusercliente(req,res){
var page=1;

var itemsPerPag=4;
User.find({_id:req.params.user}).exec((err,followse)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});


var vectorr=[];

 
console.log("aqui vivo");
console.log(followse[0].allergy);
vectorr=followse[0].allergy;
console.log("vector");
console.log(vectorr);
console.log(vectorr[0]);
console.log(vectorr[1]);
console.log(vectorr[2]);


Food.find({ingrediente:{"$nin":vectorr}}).sort('-created_at').
paginate(page,itemsPerPag,(err,follows,total)=>{
if(err)return res.status(500).send({message:'error al devolver publicaciones'});
if(!follows)return res.status(404).send({message:'No hay publicaciones'});
return res.status(200).send({
	total_items:total,
	pages:Math.ceil(total/itemsPerPag),
	page:page,
	items_per_pag:itemsPerPag,
	follows

});

});

});




}








module.exports={
	probando,
	savePublication,
	getPublications, 
	getPublication, 
	deletePublication,
	uploadImage,
	getImageFile,
	getPublicationss,
	uploadcomentario,
	uploadcomentarioo,
	getPublicatione,
	getPublicationex,
	getPublicationexx,
	getPublicationexxs,
	getmyusercliente,
	getPublicationexxt  
} 