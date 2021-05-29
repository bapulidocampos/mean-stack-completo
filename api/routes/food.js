'use strict'
var express=require('express');
//carga el controlador de publication
var FoodController=require('../controllers/food');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/food'});

api.get('/probando-pub',md_auth.ensureAuth,FoodController.probando);
api.post('/food',md_auth.ensureAuth,FoodController.savePublication);
api.get('/publications/:page?',md_auth.ensureAuth,FoodController.getPublications);
api.get('/publicationse/:page?',md_auth.ensureAuth,FoodController.getPublicatione);
api.get('/publicationsex/:page?',md_auth.ensureAuth,FoodController.getPublicationex);
api.get('/publicationsexx/:page?',md_auth.ensureAuth,FoodController.getPublicationexx);
api.get('/publicationsexxs/:page?',md_auth.ensureAuth,FoodController.getPublicationexxs);
api.get('/publications/:page?',md_auth.ensureAuth,FoodController.getPublicationss);
api.get('/publications-user/:user/:page?',md_auth.ensureAuth,FoodController.getPublicationss);
api.get('/publication/:id?',md_auth.ensureAuth,FoodController.getPublication);
api.delete('/publication/:id',md_auth.ensureAuth,FoodController.deletePublication);
api.post('/upload-image-pub/:id',[md_auth.ensureAuth,md_upload],FoodController.uploadImage);
api.post('/upload-com-pub',[md_auth.ensureAuth,md_upload],FoodController.uploadcomentario);

api.get('/get-image-pub/:imageFile',FoodController.getImageFile);
 module.exports=api;
