const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//api
const app = express();

// configuración
app.set("port", 5000);

// usando morgan
app.use(morgan("dev")); // visualizar los estados de nuestro servidor
app.use(express.json()); // manejar los json
app.use(cors());

// rutas

//Login usuarios
app.post("/usuarios", (req, res) => {
  let users = require("./users.json"); //variable que guarda el json de usuarios
  //Variables para guardar lo que ingresa el usuario
  var usuario = req.body.usuario;
  var password = req.body.password;

  var usuarioEncontrado = false;

  for (var i = 0; i < users.length; i++) {
    if (
      usuario.trim() == users[i].Usuario &&
      password.trim() == users[i].Password
    ) {
      usuarioEncontrado = true;
      res.send(users[i]);
      // location.href = "Fronted/pokedex.html";
      break;
    } else {
      usuarioEncontrado = false;
    }
  }

  //Mensaje en el caso que no se encuentre el usuario
  if (usuarioEncontrado == false) {
    res.send(usuarioEncontrado);
  }
});

// //Mostrar todos los pokemons
// app.post("/pokemons", (req, res) => {
//   let pokedex = require("./pokedex.json");

//   var posicion = req.body.num;

//   //Regresa la posicion que se le pide
//   res.send(pokedex[0]);
// });
var posicionP = 0;
//Mostrar todos los pokemons
app.get("/pokemons", (req, res) => {
  let pokedex = require("./pokedex.json");

  //Regresa la posicion que se le pide
  res.send(pokedex[posicionP]);
  posicionP++;
  if (posicionP >= 15) {
    posicionP = 0;
  }
});

//Mostrar pokemons por Nombre o id
app.post("/Nombre_Pokedex", (req, res) => {
  let pokes = require("./pokedex.json"); //variable que guarda el json de pokedex

  var nombre = req.body.nombre;

  nombre = nombre[0].toUpperCase() + nombre.slice(1);

  var nombreEncontrado = false;

  for (var i = 0; i < pokes.length; i++) {
    if (
      nombre.trim() == pokes[i].Nombre ||
      parseInt(nombre) == pokes[i].Numero
    ) {
      //Mostrar la informcacion del pokemon
      res.send(pokes[i]);
      nombreEncontrado = true;
      break;
    } else {
      nombreEncontrado = false;
    }
  }

  //Mensaje en el caso que no se encuentre el usuario
  if (nombreEncontrado == false) {
    res.send(pokes[15]);
  }
});

//Mostrar pokemons por tipo
app.post("/Tipo_Pokedex", (req, res) => {
  let pokedexT = require("./pokedex.json");

  var tipo = req.body.tipo;

  var numTipo = req.body.numTipo;

  if (tipo == "Agua") {
    res.send(pokedexT[numTipo]);
    tipoEncontrad = true;
  } else if (tipo == "Fuego") {
    res.send(pokedexT[numTipo]);
    tipoEncontrad = true;
  } else if (tipo == "Planta") {
    res.send(pokedexT[numTipo]);
    tipoEncontrad = true;
  }
});

// inicializando mi servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en el puerto: " + app.get("port"));
});
