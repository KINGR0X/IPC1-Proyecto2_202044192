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

app.get("/", (req, res) => {
  res.send("Lugar por defecto");
});

//Login usuarios
app.post("/usuarios", (req, res) => {
  let users = require("./users.json"); //variable que guarda el json de usuarios
  //Variables para guardar lo que ingresa el usuario
  var usuario = req.body.usuario;
  var password = req.body.password;

  var usuarioEncontrado = false;

  for (var i = 0; i < users.length; i++) {
    if (usuario == users[i].Usuario && password == users[i].Password) {
      res.send({ Mensaje: "Usuario encontrado" });
      usuarioEncontrado = true;
      break;
    } else {
      usuarioEncontrado = false;
    }
  }

  //Mensaje en el caso que no se encuentre el usuario
  if (usuarioEncontrado == false) {
    res.send({ Mensaje: "Usuario NO encontrado" });
  }
});

//Mostrar todos los pokemons
app.get("/pokemons", (req, res) => {
  let pokedex = require("./pokedex.json");
  res.send(pokedex);
});

//Mostrar pokemons por numero
app.post("/Numero_Pokedex", (req, res) => {
  let pokes = require("./pokedex.json"); //variable que guarda el json de pokedex

  var num = req.body.num;

  var numeroEncontrado = false;

  for (var i = 0; i < pokes.length; i++) {
    if (num == pokes[i].Numero) {
      //Mostrar la informcacion del pokemon
      res.send(pokes[i]);
      numeroEncontrado = true;
      break;
    } else {
      numeroEncontrado = false;
    }
  }

  //Mensaje en el caso que no se encuentre el usuario
  if (numeroEncontrado == false) {
    res.send({ Mensaje: "Numero en la pokedex no encontrado" });
  }
});

//Mostrar pokemons por Nombre
app.post("/Nombre_Pokedex", (req, res) => {
  let pokes = require("./pokedex.json"); //variable que guarda el json de pokedex

  var nombre = req.body.nombre;

  var nombreEncontrado = false;

  for (var i = 0; i < pokes.length; i++) {
    if (nombre == pokes[i].Nombre) {
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
    res.send({ Mensaje: "Nombre en la pokedex no encontrado" });
  }
});

//Mostrar pokemons por tipo
app.post("/Tipo_Pokedex", (req, res) => {
  let tipoAgua = require("./tipoAgua.json"); //variable que guarda el json de pokedex
  let tipoFuego = require("./tipoFuego.json");
  let tipoPlanta = require("./tipoPlanta.json");

  var tipo = req.body.tipo;

  var tipoEncontrado = false;

  if (tipo == "Agua") {
    res.send(tipoAgua);
  } else if (tipo == "Fuego") {
    res.send(tipoFuego);
  } else if (tipo == "Planta") {
    res.send(tipoPlanta);
  } else {
    res.send({ Mensaje: "Tipo en la pokedex no encontrado" });
  }
});

// inicializando mi servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en el puerto: " + app.get("port"));
});
