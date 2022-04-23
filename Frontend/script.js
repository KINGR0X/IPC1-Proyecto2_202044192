const pokemonContainer = document.querySelector(".pokemon-container");

//Buscar usuario
async function buscarUsuario() {
  let url = "http://localhost:5000/usuarios";
  //json con el que le mandamos los datos al post
  var usuarios = {
    usuario: document.getElementById("nombre").value,
    password: document.getElementById("password").value,
  };

  const respuestas = await fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(usuarios),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      usuarioReal(data);
    });
}

function usuarioReal(datos) {
  if (datos == true) {
    location.href = "pokedex.html";
  } else if (datos == false) {
    // alert("Error");
    $("#exampleModalCenter").modal("show");
  }
}

function Todos() {
  limpiarPokes(pokemonContainer);
  let url = "http://localhost:5000/pokemons";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      crearPokemon(data);
    });
}

//Uso esto para cuando estan todos los pokemons y hay que seleccionar uno, devuelve el valor colo si fuera un array, segun su posicion, como un array
// var quemado = -1;
// var kill = "datos" + "(" + parseInt(quemado) + ")";

function atrapaATodos() {
  document.body.style.backgroundColor = "rgb(229, 229, 229)";

  for (var i = 0; i < 15; i++) {
    // quemado = quemado + 1;
    // kill = "datos" + "(" + parseInt(quemado) + ")";
    Todos();
  }
}

//Buscar pokemon por nombre
async function buscar() {
  document.body.style.backgroundColor = "rgb(229, 229, 229)";
  var nombreB = document.getElementById("poke").value;

  if (nombreB == "") {
    nombreB = "X";
  }

  limpiarPokes(pokemonContainer);
  let url = "http://localhost:5000/Nombre_Pokedex";
  //json con el que le mandamos los datos al post
  var names = {
    nombre: nombreB,
  };

  const respuestas = await fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(names),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      crearPokemon(data);
    });
}

//Buscar pokemon por tipo
async function buscarTipo(numB, tipoPok) {
  limpiarPokes(pokemonContainer);
  let url = "http://localhost:5000/Tipo_Pokedex";
  //json con el que le mandamos los datos al post
  var tipoP = {
    tipo: tipoPok,
    numTipo: numB,
  };

  const respuestas = await fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(tipoP),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      crearPokemon(data);
    });
}

function tipoAgua() {
  var cont = 0;
  var max = 5;
  document.body.style.backgroundColor = "rgba(104, 144, 240)";

  var tipo = "Agua";

  for (var cont; cont < max; cont++) {
    buscarTipo(cont, tipo);
  }
}

function tipoFuego() {
  var cont = 5;
  var max = 10;
  document.body.style.backgroundColor = "rgba(243, 153, 89)";
  var tipo = "Fuego";

  for (var cont; cont < max; cont++) {
    buscarTipo(cont, tipo);
  }
}

function tipoPlanta() {
  var cont = 10;
  var max = 15;
  document.body.style.backgroundColor = "rgba(147, 211, 115)";
  var tipo = "Planta";

  for (var cont; cont < max; cont++) {
    buscarTipo(cont, tipo);
  }
}

function crearPokemon(pokemon) {
  //parte de atras de la tarjeta
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const shinyContainer = document.createElement("div");
  shinyContainer.classList.add("shiny-container");

  //Le agrego el atributo onclick, para poder obtener el nombre del pokemon
  // spriteContainer.setAttribute("onClick", num);

  const sprite = document.createElement("img");
  sprite.src = pokemon.Imagen;

  spriteContainer.appendChild(sprite);

  //imagen shiny
  const spriteShiny = document.createElement("img");
  spriteShiny.src = pokemon.Shiny;

  shinyContainer.appendChild(spriteShiny);

  const number = document.createElement("p");
  number.textContent = `Nº ${pokemon.Numero}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.setAttribute("id", "nombre");
  name.textContent = pokemon.Nombre;

  const nameShiny = document.createElement("p");
  nameShiny.classList.add("nameShiny");
  nameShiny.setAttribute("id", "nombre");
  nameShiny.textContent = pokemon.Nombre + " Shiny";

  const type = document.createElement("p");
  //Para colcoarle css al tipo
  type.classList.add(pokemon.Tipo);
  type.textContent = pokemon.Tipo;

  const attack = document.createElement("p");
  attack.textContent = "Ataque: " + pokemon.Ataque;

  //imagen del poke
  card.appendChild(spriteContainer);
  //numero del pokemon
  card.appendChild(number);
  //nombre del pokemon
  card.appendChild(name);
  //tipo del pokemon
  card.appendChild(type);
  //ataque del pokemon
  card.appendChild(attack);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");

  cardBack.appendChild(shinyContainer);
  cardBack.appendChild(nameShiny);

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}

// function datos(nombreD) {
//   //Obtiene el nombre del pokemon presionado
//   var pokeSelec = document.getElementsByClassName("name")[nombreD].textContent;
//   console.log(pokeSelec);
//   buscarBig(pokeSelec);
// }

//Funcion para que se borren todos los pokemones ya "dibujados"
function limpiarPokes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function limpiar() {
  limpiarPokes(pokemonContainer);
}
