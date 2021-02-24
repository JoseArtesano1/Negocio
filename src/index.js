const express=require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');


//Inicializar
const app= express();

//Setting
app.set('port',process.env.PORT|| 3000);
app.set('views',path.join(__dirname,'views'));// dirname le indica donde estamos trabajando para establece la carpte views
app.engine('.hbs',exphbs({  //motor de plantilla
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),  
  partialsDir:path.join(app.get('views'),'partials'),
  extname:'.hbs',  //indicamos que nuestros archivos acaban en hbs
  helpers:require('./lib/handlebars') //para luego cambio de fechas
}));

app.set('view engine', '.hbs'); // para utilizar el motor

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Variables globales


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/citas',require('./routes/citas'));


//Public


//Start Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});

