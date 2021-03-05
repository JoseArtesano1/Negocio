const express= require('express');
const router= express.Router();
const {isLoggedIn}= require('../lib/autoriza');
const pool= require('../database');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('tecnicos/add');
    });
    

    // INSERTAR
    router.post('/add', isLoggedIn, async(req,res)=>{
     const {Nombre} = req.body;
     const NewTecnico={
         Nombre 
     };
       await  pool.query('INSERT INTO t_tecnico set ?',[NewTecnico]);
       res.redirect('/tecnicos');
        
    });

    //LECTURA
    router.get('/', isLoggedIn, async(req, res)=>{
       
        const tecnicos=  await pool.query('SELECT * FROM t_tecnico');
        res.render('tecnicos/list', {tecnicos});  
    });

   // BORRAR

   router.get('/delete/:id', isLoggedIn, async(req, res)=>{
    
     const {id}= req.params;
     
     await pool.query('DELETE FROM t_tecnico WHERE idT_Tecnico= ?',[id]);
     res.redirect('/tecnicos'); 
   });

   //EDITAR

   router.get('/edit/:id', isLoggedIn, async (req, res)=>{
      const {id}= req.params;
     const tecnicos=  await pool.query('SELECT * FROM t_tecnico WHERE idT_Tecnico= ?',[id]);
     console.log(tecnicos[0]);
     res.render('tecnicos/edit',{tecnico:tecnicos [0]});
   });

    router.post('/edit/:id', isLoggedIn, async(req, res)=>{
      const{id}= req.params;
     const{Nombre}= req.body;
     const NewTecnico={
         Nombre
     };
    
      await pool.query('UPDATE t_tecnico set ? WHERE idT_Tecnico= ?',[NewTecnico,id]);
      res.redirect('/tecnicos'); 
   }); 

module.exports=router;