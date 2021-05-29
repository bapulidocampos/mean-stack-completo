'use strict'
var express=require('express');
//carga el controlador de follow
var TipsalimentacionController=require('../controllers/tipsalimentacion');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/tipsalimentacion'});

 api.get('/probando-tips',md_auth.ensureAuth,TipsalimentacionController.probando);
 api.post('/tips',md_auth.ensureAuth,TipsalimentacionController.savePublication);
 api.get('/publications/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublications);
 //aqui
  api.get('/publicationse/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicatione);
  //´para mirar una cosita del sistema
  api.get('/publicationserutine/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationerutine);


  api.get('/tipse/:page?',md_auth.ensureAuth,TipsalimentacionController.gettips);

  //aqui
  //  api.get('/publicationsex/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationex);
 //api.get('/publicationsexx/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationexx);
  api.get('/tips/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationexxs);
   



 api.get('/publications/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationss);
 api.get('/tips-user/:user/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationss);

  api.get('/tips-userm/:user/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationssm);
//api.get('/tips-uservector/:[user]/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationssvector);
api.post('/tips-uservector',md_auth.ensureAuth,TipsalimentacionController.getPublicationssvector);

 //api.get('/publications-user/:user/:page?',md_auth.ensureAuth,PublicationController.getPublicationsUser);
 api.get('/publication/:id?',md_auth.ensureAuth,TipsalimentacionController.getPublication);
 api.delete('/tips/:id',md_auth.ensureAuth,TipsalimentacionController.deletePublication);
api.post('/upload-image-tips/:id',[md_auth.ensureAuth,md_upload],TipsalimentacionController.uploadImage);

api.post('/upload-com-tips',[md_auth.ensureAuth,md_upload],TipsalimentacionController.uploadcomentario);

api.get('/get-image-tips/:imageFile',TipsalimentacionController.getImageFile);
 module.exports=api;


//-----------------------------------------------------------------------------------------

'use strict'
var express=require('express');
//carga el controlador de follow
var TipsalimentacionController=require('../controllers/tipsalimentacion');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/tipsalimentacion'});

 api.get('/probando-tips',md_auth.ensureAuth,TipsalimentacionController.probando);
 api.post('/tips',md_auth.ensureAuth,TipsalimentacionController.savePublication);
 api.get('/publications/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublications);
 api.get('/publicationse/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicatione);
 api.get('/publicationserutine/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationerutine);
 api.get('/tipse/:page?',md_auth.ensureAuth,TipsalimentacionController.gettips);
 api.get('/tips/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationexxs);
 api.get('/publications/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationss);
 api.get('/tips-user/:user/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationss);
 api.get('/tips-userm/:user/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationssm);
 api.post('/tips-uservector',md_auth.ensureAuth,TipsalimentacionController.getPublicationssvector);
 api.get('/publication/:id?',md_auth.ensureAuth,TipsalimentacionController.getPublication);
 api.delete('/tips/:id',md_auth.ensureAuth,TipsalimentacionController.deletePublication);
 api.post('/upload-image-tips/:id',[md_auth.ensureAuth,md_upload],TipsalimentacionController.uploadImage);
 api.post('/upload-com-tips',[md_auth.ensureAuth,md_upload],TipsalimentacionController.uploadcomentario);
 api.get('/get-image-tips/:imageFile',TipsalimentacionController.getImageFile);
 module.exports=api;
