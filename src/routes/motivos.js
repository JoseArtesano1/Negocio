const express= require('express');
const pool = require('../database');
const router= express.Router();
const {isLoggedIn}= require('../lib/autoriza');
var mysql = require('mysql');








router.get('/add',async(req, res)=>{
  var t= await  pool.query('SELECT * FROM t_tecnico');
  
 
    res.render('motivos/add');
   
});

//INSERTAR

router.post('/add', async(req,res)=>{
 const{Denominacion, Duracion}=   req.body;
 
 const NewMotivo={
   Denominacion,
   Duracion
   
 }
});

/* var t = document.getElementById("tecnico");
t.onchange = function(){
  var indice = t.selectedIndex;   
  var valor = t.options[indice].value;  
  var texto = t.options[indice].text;
  var tec=  pool.query('SELECT * FROM t_tecnico');
  for(tecnico in tec){
   if(tecnico.Nombre==valor){
      tecnico.IdTecnico;
   }
  }
}; */
//var t = document.getElementById("tecnico");
 async function carga (){
  var t = document.getElementById("tecnicos");
  
  var tec= await  pool.query('SELECT Nombre FROM t_tecnico');
  for(tecnico in tec){
    t.add(new Option(tecnico));
   
    
  }
  
};



//select = document.getElementById("año");
/* for(i = 2000; i <= 2050; i++){
    option = document.createElement("option");
    option.value = i;
    option.text = i;
    select.appendChild(option);
} */





module.exports=router;