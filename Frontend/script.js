const pokemonContainer = document.querySelector(".pokemon-container");

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
  for (var i = 0; i < 15; i++) {
    // quemado = quemado + 1;
    // kill = "datos" + "(" + parseInt(quemado) + ")";
    Todos();
  }
}

//Buscar pokemon por nombre
async function buscar() {
  limpiarPokes(pokemonContainer);
  let url = "http://localhost:5000/Nombre_Pokedex";
  //json con el que le mandamos los datos al post
  var names = {
    nombre: document.getElementById("poke").value,
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

//Buscar pokemon por numero
async function buscarNumero() {
  limpiarPokes(pokemonContainer);
  let url = "http://localhost:5000/Numero_Pokedex";
  //json con el que le mandamos los datos al post
  var numero = {
    num: document.getElementById("poke").value,
  };

  const respuestas = await fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(numero),
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
async function buscarTipo(numB) {
  limpiarPokes(pokemonContainer);
  let url = "http://localhost:5000/Tipo_Pokedex";
  //json con el que le mandamos los datos al post
  var tipoP = {
    tipo: document.getElementById("poke").value,
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

function todoTipo() {
  var cont;
  var max;
  cont = 0;
  if (document.getElementById("poke").value == "Agua") {
    cont = 0;
    max = 5;
  } else if (document.getElementById("poke").value == "Fuego") {
    cont = 5;
    max = 10;
  } else if (document.getElementById("poke").value == "Planta") {
    cont = 10;
    max = 15;
  } else {
    cont = 20;
    max = 21;
  }

  for (var cont; cont < max; cont++) {
    buscarTipo(cont);
  }
}

function crearPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  //Le agrego el atributo onclick, para poder obtener el nombre del pokemon
  // spriteContainer.setAttribute("onClick", num);

  const sprite = document.createElement("img");
  sprite.src = pokemon.Imagen;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `Nº ${pokemon.Numero}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.setAttribute("id", "nombre");
  name.textContent = pokemon.Nombre;

  const type = document.createElement("p");
  type.textContent = pokemon.Tipo;

  const attack = document.createElement("p");
  attack.textContent = pokemon.Ataque;

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

  pokemonContainer.appendChild(card);
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
