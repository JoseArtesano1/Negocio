const express=require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');
const flash= require('connect-flash');
const session= require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport= require('passport');


const { database } = require('./keys');
//Inicializar
const app= express();
require('./lib/passport');

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
app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/citas',require('./routes/citas'));
app.use('/authentication',require('./routes/authentication'));
app.use('/tecnicos',require('./routes/tecnicos'));
app.use('/motivos',require('./routes/motivos'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});

