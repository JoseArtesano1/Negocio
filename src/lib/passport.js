const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool= require('../database');
const helpers= require('../lib/helpers');


 passport.use('local.signin', new LocalStrategy({
  usernameField: 'UsuarioNombre',          
  passwordField: 'Pass',
  passReqToCallback: true 
}, async (req, UsuarioNombre, Pass, done) =>{
  
   const rows= await pool.query('SELECT * FROM t_usuario WHERE UsuarioNombre=? ',[UsuarioNombre]);
   if(rows.length>0){
     const usuario= rows[0];  //solo queremos un usuario
    const existe=  await helpers.matchPassword(Pass, usuario.Pass);

    if(existe){
      done(null, usuario, req.flash('success', 'Welcome ' + usuario.UsuarioNombre));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));  // el null se refiere al error
                                                                      // el false manda false a authentication metodo post  
    }
    
   }else{
    return done(null, false, req.flash('message', 'The Username does not exists.'));
   }

}

)); 



passport.use('local.signup', new LocalStrategy({
    usernameField: 'UsuarioNombre',          
    passwordField: 'Pass',
    passReqToCallback: true  // recibe todos los datos
}, async(req, UsuarioNombre, Pass, done)=>{
   
    const { Nombre,Dni, Direccion, Telefono, E_mail,NombreCard,NumeroCard,fechaCard,CvvCard } = req.body;
    let newUser = {
      Nombre,
      UsuarioNombre,
      Pass,
      Dni,
      Direccion,
      Telefono,
      E_mail,
      NombreCard,
      NumeroCard,
      fechaCard,
      CvvCard
   };
 newUser.Pass= await helpers.encryptpassword(Pass);
   
  const result= await pool.query('INSERT INTO t_usuario SET ?', [newUser]);
  newUser.id=result.insertId;
  return done(null,newUser);
}));


 passport.serializeUser((user, done) => {
    done(null, user.idT_Usuario);
  });
  
  //preguntar a la base
  passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM t_usuario WHERE idT_Usuario = ?', [id]);
    done(null, rows[0]);
  }); 