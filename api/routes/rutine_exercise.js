'use strict'
var express=require('express');
//carga el controlador de follow
var Rutine_exerciseController=require('../controllers/rutine_exercise');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/rutine_exercise'});
//getPublicationexxs
 api.get('/probando-rutine',md_auth.ensureAuth,Rutine_exerciseController.probando);
 api.post('/rutine',md_auth.ensureAuth,Rutine_exerciseController.savePublication);
 api.get('/publications/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublications);
 //aqui
  api.get('/publicationse/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicatione);

  api.get('/tipse/:page?',md_auth.ensureAuth,Rutine_exerciseController.gettips);

  //aqui
  //  api.get('/publicationsex/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationex);
 //api.get('/publicationsexx/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationexx);
  api.get('/rutine/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationexxs);
   


 api.get('/publications/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationss);
 api.get('/tips-userz/:user/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationss);
//getPublicationssm
  api.get('/tips-usermexercise/:user/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationssm);
//
  api.get('/tips-usermexercisei/:user/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationssmi);


  //return this._http.get(this.url+'tips-usermexercise/'+user_id+'/'+page,{headers:headers});
//api.get('/tips-uservector/:[user]/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationssvector);
api.post('/tips-uservector',md_auth.ensureAuth,Rutine_exerciseController.getPublicationssvector);

 //api.get('/publications-user/:user/:page?',md_auth.ensureAuth,PublicationController.getPublicationsUser);
 api.get('/publication/:id?',md_auth.ensureAuth,Rutine_exerciseController.getPublication);
 api.delete('/rutine_exercised/:id',md_auth.ensureAuth,Rutine_exerciseController.deletePublication);
api.post('/upload-image-tips/:id',[md_auth.ensureAuth,md_upload],Rutine_exerciseController.uploadImage);

api.post('/upload-com-tips',[md_auth.ensureAuth,md_upload],Rutine_exerciseController.uploadcomentario);

api.get('/get-image-rutine/:imageFile',Rutine_exerciseController.getImageFile);
 module.exports=api;


//--------------------------------------------------------------------------------
/*
'use strict'
var express=require('express');
//carga el controlador de follow
var Rutine_exerciseController=require('../controllers/rutine_exercise');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/rutine_exercise'});

 api.get('/probando-rutine',md_auth.ensureAuth,Rutine_exerciseController.probando);
 api.post('/rutine',md_auth.ensureAuth,Rutine_exerciseController.savePublication);
 api.get('/publications/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublications);
 api.get('/publicationse/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicatione);
 api.get('/tipse/:page?',md_auth.ensureAuth,Rutine_exerciseController.gettips);
 api.get('/rutine/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationexxs);
 api.get('/publications/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationss);
 api.get('/tips-userz/:user/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationss);
 api.get('/tips-usermexercise/:user/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationssm);
 api.get('/tips-usermexercisei/:user/:page?',md_auth.ensureAuth,Rutine_exerciseController.getPublicationssmi);
 api.post('/tips-uservector',md_auth.ensureAuth,Rutine_exerciseController.getPublicationssvector);
 api.get('/publication/:id?',md_auth.ensureAuth,Rutine_exerciseController.getPublication);
 api.delete('/tips/:id',md_auth.ensureAuth,Rutine_exerciseController.deletePublication);
 api.post('/upload-image-tips/:id',[md_auth.ensureAuth,md_upload],Rutine_exerciseController.uploadImage);
 api.post('/upload-com-tips',[md_auth.ensureAuth,md_upload],Rutine_exerciseController.uploadcomentario);
 api.get('/get-image-rutine/:imageFile',Rutine_exerciseController.getImageFile);
 module.exports=api;

*/