/*
const {Builder, By, Key, until} = require('selenium-webdriver');

async function example() {
	let time = 5000;
  let driver = await new Builder().forBrowser('firefox').build();
//  await driver.manage().setTimeouts( { implicit: 10000 } );
  await driver.wait( 30000);

  //await driver.manage().setTimeouts( { implicit: 10000 } );
  // await driver.get('http://www.google.com/ncr');
  await driver.get('localhost:4200/');
    //driver.implicitly_wait(10)

  await driver.get('localhost:4200/login');
   await driver.get('localhost:4200/');
 //WebDriverWait wait = new WebDriverWait(driver,30);
     await driver.get('localhost:4200/login');

 await driver.get('localhost:4200/');
   // await driver.get('http://www.google.com');
   // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
   // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
 
}

*/
//example();






//nuevas caracterisitcas de java script funciones de flecha etc..
'use strict'
var mongoose=require("mongoose");
//cargamos app ya que hay esta express
var app=require('./app');
var port=3800;
//conexion mediante las promesas
mongoose.Promise=global.Promise;
//hacemos la conexion y le indicamos la url de mongodb
//mongoose.connect('mongodb://localhost:27017/curso_mean_social',{useNewUrlParser: true })
//USE .. se va a cponectar como cliente mongodb
mongoose.connect('mongodb://localhost:27017/curso_mean_social',{useUnifiedTopology: true })
//mongoose.connect('mongodb://localhost:27017/curso_mean_social',{useMongoClient:true})
//SI SE REALIZA LA CONEXION SE VA A LANZAR
.then(()=>{
	console.log("-- la conexion de la base de datos curso_mean_social se ha realizado con exito")
//crear servidor
app.listen(port,()=>{
	console.log("servidor corriendo localhost:3800");
});


}).catch(err =>console.log(err));
//si no se puede , para eso estar el catch, que captura los errores
































