'use strict'
var express=require('express');
//carga el controlador de publication
var DietController=require('../controllers/diet');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/diet'});

api.get('/probando-pub',md_auth.ensureAuth,DietController.probando);
api.post('/diet',md_auth.ensureAuth,DietController.savePublication);
api.get('/publications/:page?',md_auth.ensureAuth,DietController.getPublications);
api.get('/publicationse/:page?',md_auth.ensureAuth,DietController.getPublicatione);
api.get('/publicationsex/:page?',md_auth.ensureAuth,DietController.getPublicationex);

// api.get('/tips-user/:user/:page?',md_auth.ensureAuth,TipsalimentacionController.getPublicationss);
api.get('/publicationsexx-diet/:user/:page?',md_auth.ensureAuth,DietController.getPublicationexx);
api.get('/publicationsexx-diett/:user/:page?',md_auth.ensureAuth,DietController.getPublicationexxt);



//api.get('/publicationsexx/:page?',md_auth.ensureAuth,DietController.getPublicationexx);
api.get('/publicationsexxs/:page?',md_auth.ensureAuth,DietController.getPublicationexxs);
api.get('/publications/:page?',md_auth.ensureAuth,DietController.getPublicationss);
api.get('/publications-user/:user/:page?',md_auth.ensureAuth,DietController.getPublicationss);
api.get('/publication/:id?',md_auth.ensureAuth,DietController.getPublication);
api.delete('/diet/:id',md_auth.ensureAuth,DietController.deletePublication);
api.post('/upload-image-pub/:id',[md_auth.ensureAuth,md_upload],DietController.uploadImage);
api.post('/upload-com-pub',[md_auth.ensureAuth,md_upload],DietController.uploadcomentario);
 //traigo todos los ejercicios
//api.get('/get-my-diet',md_auth.ensureAuth,DietController.getmyusercliente);
api.get('/get-my-diet/:user?',md_auth.ensureAuth,DietController.getmyusercliente);


api.get('/get-image-pub/:imageFile',DietController.getImageFile);
 module.exports=api;
