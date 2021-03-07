const express= require('express');
const router= express.Router();

const passport= require('passport');
const {isLoggedIn,isNotLoggedIn}= require('../lib/autoriza');


// NUEVO USUARIO

router.get('/signup', isNotLoggedIn, (req, res)=>{
    res.render('usuarios/signup');
    });


    router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
      }));
    

//LOGEAR

  router.get('/signin', isNotLoggedIn,(req, res)=>{
    res.render('usuarios/signin');
  });
 

  router.post('/signin', isNotLoggedIn, (req, res,next)=>{
      passport.authenticate('local.signin',{  // conexion con authentication
        successRedirect: '/profile',  // recibe de passport el true o
        failureRedirect: '/signin',   // recibe de passport el false
        failureFlash: true
      }) (req, res, next);


  });



router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile');
});

router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect('/signin');
});

module.exports=router;