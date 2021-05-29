'use strict'
var path=require('path');
var fs=require('fs');
var moment=require('moment');
var mongoosePaginate=require('mongoose-pagination');
//var Publication=require('../models/publication');

var Rutine_exercise=require('../models/rutine_exercise');
var Exercise=require('../models/exercise');
var Tipsalimentacion=require('../models/tipsalimentacion');
var User=require('../models/User');
var Follow=require('../models/follow');
var Comentary=require('../models/comentary');
function probando (req,res){
	res.status(200).send({
		message:'hola desde el controlador tips de alimentos '
	});
}




function savePublication(req,res){
	var params=req.body;
	
//si no me llega el parametro texto
	if(!params.text) return res.status(200).send({message:'Debes enviar un texto'});
var tips=new Tipsalimentacion();
console.log(params);
tips.text=params.text;
tips.file='null';
tips.filev='null';
//publication.comentario=params.comentario;
tips.entrenador=params.entrenador;
tips.user=params.user;
console.log("vector completo "+params.vector);
console.log(params.vector[0]);
tips.vector=params.vector;
tips.created_at=moment().unix();
//publication.comentario=params.comentario;
tips.save((err,tipsStored)=>{

	if(err)return res.status(500).send({message:'error al guarda la publicacion'});
	if(!tipsStored)return res.status(404).send({message:'la publicacion no se ha guardado'});
return res.status(200).send({
	publication:tipsStored
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



///----------------------------------

//fffffffffffffffffffffffffffffffffff

/////-----------------------------------------------


function getPublicationerutine(req,res){
var page=1;
//if(req.params.page){
	//page=req.params.page;
//}
var itemsPerPag=4;
Tipsalimentacion.find({user:req.user.sub}).exec((err,publicationess)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});

var follow_clean=[];
var vectore=[];



publicationess.forEach((followee)=>{

	//para añadir el id pero estoy trayendo completo el objeto
//if(){
follow_clean.push(followee.vector);
///}


});

//

for (var i = 0; i < follow_clean.length; i++) {
	if(!follow_clean[i]==''){
	vectore[i]=follow_clean[i];
}
console.log("vector es la posicion "+i+" ="+vectore[i]);
}

//manejaaa
	
for (var i = 0; i < follow_clean.length; i++) 
{
	

for (var j = 0; j < follow_clean.length; j++) 
	{

	if(!follow_clean[j]==''){
	vectore[i]=follow_clean[j];

	}

}
/*
 for (int i = 1; i <= 10; i++) {
            System.out.println("Tabla de multiplicar del " + i);
            for (int j = 1; j <= 10; j++) {
                System.out.println(i  + " X " + j + " =" + i*j);
            }
            
        }

*/



console.log("vector nuevo es la posicion "+i+" ="+vectore[i]);
}
	



//for (var i = 0; i < publicationess.vector.length; i++) {
	//Things[i]

//}

//}

//console.log(" a "+publicationess.length);
//console.log(" b "+publicationess.vector.length);
//añadimos nuestras publicaciones 
//follow_clean.push(req.user.sub);

console.log(publicationess);
console.log(publicationess.id);
console.log("vector "+publicationess.vector);
//console.log(vector); 
//console.log("vector "+publicationess.vector[0]);
console.log(follow_clean); 
console.log(follow_clean[14][0]);
console.log(follow_clean[14][1]);
console.log(" g "+follow_clean[15]);
console.log(follow_clean[16]);
console.log(follow_clean[17]);
console.log(follow_clean[18]);
console.log(follow_clean.length);
//buscar con $in buscar dentro de un array , buscar las coincidencia
//buscar todos los documentos cuyo usuario este contenido en el array follow_clean
//sort ordena las publicaciones de mas nuevas a mas viejas
console.log(follow_clean[[]]);
Exercise.find({_id:{"$in":follow_clean[17][1]}}).sort('-created_at').
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




////--------------------------------------------------------------



////////////////////////getPublicationsexxs en ruta///////////////////////
function getPublicationexxs(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
//Comentary.find({user:{"$in":follow_clean}}).sort('-created_at').populate('user').
//paginate(page,itemsPerPag,(err,publications,total)=>{

//Comentary.find({}).sort('-created_at').populate('user ').paginate
//(page,itemsPerPag,(err,publications,total)=>{

Tipsalimentacion.find({}).sort('-created_at').populate('user entrenador').
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




//-------------------------------------------------------------------------
//esta es la ruta   getPublicationss

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
console.log("pagina "+req.params.page);
console.log("aqui"+req.params.user);
console.log("usuario que le envio al metodo "+req.user.sub);
//entrenador:req.user.sub,user:req.params.user
Tipsalimentacion.find({}).sort('-created_at').populate('entrenador user').
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



///imprimir el vecto---------------------------------------





//imprimir el vector ---------------------

function getPublicationssvector(req,res){
//var params=req.body;
console.log("si sirvio ");
//console.log("pagina "+req.params.page);
//console.log("aqui "+req.params.user);
//console.log("aqui "+req.params[0]);
//console.log("aqui 3 "+req.params.user_id);
//console.log("a "+req.user_id[0])
//console.log("aja "+(req.user_id.vector[0]));
//console.log(req.params.hola);
//console.log(req.params);

console.log(req.body);
console.log(req.body[0]);
var params=req.body;
console.log("params "+params[0]);
//-console.log(req.body.hola);
//console.log(req.body[1]);
//console.log("usuario que le envio al metodo "+req.user.sub);





 

}



// getPublicationsUserm  CUANDO YO ME MIRO MI PROPIO PERFIL

function getPublicationssm(req,res){
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
Tipsalimentacion.find({}).sort('-created_at').populate('entrenador user').
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
var publicationId=req.params.id;
Tipsalimentacion.find({'entrenador':req.user.sub,'_id':publicationId}).remove(err=>{
if(err)return res.status(500).send({message:'error al borrar publicacion'});
//if(!publicationRemoved)return res.status(500).send({message:'No se ha borrado la publicacion'});
return res.status(200).send({message:'publicacion eliminada'});

	});

}



//subir imagen AVATAR DE USUARIO---------------------------------




function uploadImage(req,res){
var imcId=req.params.id;

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
			

			Tipsalimentacion.findOne({'entrenador':req.user.sub,'_id':imcId}).exec((err,imc)=>{

				if(imc){


					if(file_ext=='mp4'){

						Tipsalimentacion.findByIdAndUpdate(imcId,{filev:file_name},{new:true},(err,imcUpdated)=>{
				if(err) return res.status(500).send({message:'Error en la peticion'});
if(!imcUpdated) return res.status(500).send({message:'No se ha podido actualizar el usuario'});
return res.status(200).send({imc:imcUpdated,file_ext});
			});

					}
else{

	Tipsalimentacion.findByIdAndUpdate(imcId,{file:file_name},{new:true},(err,imcUpdated)=>{
				if(err) return res.status(500).send({message:'Error en la peticion'});
if(!imcUpdated) return res.status(500).send({message:'No se ha podido actualizar el usuario'});
return res.status(200).send({imc:imcUpdated,file_ext});
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



////////////////////------------------------------------



function getImageFile(req,res){
	//recoger por la url
	//el nombre de fichero que le vamos a pasar por la url
	//va recibir el metodo y va sacar esa imagen del sistemas de fichero
	var image_file=req.params.imageFile;
	//va tener el path de las imagenes de usuario
	var path_file='./uploads/tipsalimentacion/'+image_file;
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


function gettips(req,res){
var page=1;
if(req.params.page){
	page=req.params.page;
}
var itemsPerPag=4;
User.find({}).exec((err,publicationess)=>{
if(err)return res.status(500).send({message:'error al devolver el seguimiento'});

var follow_clean=[];
publicationess.forEach((followee)=>{
	//para añadir el id pero estoy trayendo completo el objeto
follow_clean.push(followee._id);
});

//añadimos nuestras publicaciones 
//follow_clean.push(req.user.sub);


console.log(follow_clean);
//buscar con $in buscar dentro de un array , buscar las coincidencia
//buscar todos los documentos cuyo usuario este contenido en el array follow_clean
//sort ordena las publicaciones de mas nuevas a mas viejas
Tipsalimentacion.find({entrenador:{"$in":follow_clean}}).sort('-created_at').populate(' user entrenador').
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
	getPublicationexxs,
	gettips,
	getPublicationssm,
	getPublicationssvector,
	getPublicationerutine
	

}