'use strict'
var express=require('express');
//carga el controlador de follow
var ExerciseController=require('../controllers/exercise');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/exercise'});

 api.get('/probando-exe',md_auth.ensureAuth,ExerciseController.probando);
 api.post('/exercises',md_auth.ensureAuth,ExerciseController.savePublication);
 api.get('/exercises-get/:page?',md_auth.ensureAuth,ExerciseController.getPublications);
 api.get('/exercises-get/:page?',md_auth.ensureAuth,ExerciseController.getPublicationss);

 //obtengo categoria bicep
  api.get('/exercises-gett/:page?',md_auth.ensureAuth,ExerciseController.getPublicationsss);
   //obtengo categoria tricep
  api.get('/exercises-gett-tricep/:page?',md_auth.ensureAuth,ExerciseController.getPublicationssstricep);
   //obtengo categoria cardio
  api.get('/exercises-gett-cardio/:page?',md_auth.ensureAuth,ExerciseController.getPublicationssscardio);
 
 //traigo todos los ejercicios
    api.get('/get-my-exercise',md_auth.ensureAuth,ExerciseController.getmyusercliente);
     //traigo todos los ejercicios bicep
    api.get('/get-my-exercise-bicep',md_auth.ensureAuth,ExerciseController.getmyusercliente);
     //traigo todos los ejercicios tricep
    api.get('/get-my-exercise-tricep',md_auth.ensureAuth,ExerciseController.getmyusercliente);
     //traigo todos los ejercicios cardio
    api.get('/get-my-exercise-cardio',md_auth.ensureAuth,ExerciseController.getmyusercliente);



 api.get('/publications-user/:user/:page?',md_auth.ensureAuth,ExerciseController.getPublicationss);
 //api.get('/publications-user/:user/:page?',md_auth.ensureAuth,PublicationController.getPublicationsUser);
 api.get('/publication/:id?',md_auth.ensureAuth,ExerciseController.getPublication);
 api.delete('/exercise/:id',md_auth.ensureAuth,ExerciseController.deletePublication);
api.post('/upload-image-pubb/:id',[md_auth.ensureAuth,md_upload],ExerciseController.uploadImage);
api.get('/get-image-pubb/:imageFile',ExerciseController.getImageFile);
 module.exports=api;
 



 /////-----------------------------------------------------------------------------

'use strict'
var express=require('express');
//carga el controlador de follow
var ExerciseController=require('../controllers/exercise');
//cargar el router de express
var api=express.Router();
//middleware autentificacion y subida de archivo
var md_auth=require('../middlewares/authenticated');
var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/exercise'});
api.get('/probando-exe',md_auth.ensureAuth,ExerciseController.probando);
api.post('/exercises',md_auth.ensureAuth,ExerciseController.savePublication);
api.get('/exercises-get/:page?',md_auth.ensureAuth,ExerciseController.getPublications);
api.get('/exercises-get/:page?',md_auth.ensureAuth,ExerciseController.getPublicationss);
 //obtengo categoria bicep
api.get('/exercises-gett/:page?',md_auth.ensureAuth,ExerciseController.getPublicationsss);
   //obtengo categoria tricep
api.get('/exercises-gett-tricep/:page?',md_auth.ensureAuth,ExerciseController.getPublicationssstricep);
   //obtengo categoria cardio
api.get('/exercises-gett-cardio/:page?',md_auth.ensureAuth,ExerciseController.getPublicationssscardio);
 //traigo todos los ejercicios
api.get('/get-my-exercise',md_auth.ensureAuth,ExerciseController.getmyusercliente);
     //traigo todos los ejercicios bicep
api.get('/get-my-exercise-bicep',md_auth.ensureAuth,ExerciseController.getmyusercliente);
     //traigo todos los ejercicios tricep
api.get('/get-my-exercise-tricep',md_auth.ensureAuth,ExerciseController.getmyusercliente);
     //traigo todos los ejercicios cardio
api.get('/get-my-exercise-cardio',md_auth.ensureAuth,ExerciseController.getmyusercliente);
api.get('/publications-user/:user/:page?',md_auth.ensureAuth,ExerciseController.getPublicationss);
api.get('/publication/:id?',md_auth.ensureAuth,ExerciseController.getPublication);
api.delete('/exercise/:id',md_auth.ensureAuth,ExerciseController.deletePublication);
api.post('/upload-image-pubb/:id',[md_auth.ensureAuth,md_upload],ExerciseController.uploadImage);
api.get('/get-image-pubb/:imageFile',ExerciseController.getImageFile);
 module.exports=api;
 













