const apiUri = "https://pokeapi.co/api/v2/pokemon";

const poke_container = document.getElementById("poke_container");
const poke_detail = document.getElementById("poke_detail");

const getAll = async () => {
  const res = await fetch(apiUri);
  const pokemons = await res.json();
  createTablePokemons(pokemons.results);
};

const getPokemon = async (url) => {
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonDetail(pokemon);
};

const createTablePokemons = (pokemons) => {
  const pokemonsli = document.createElement("ul");
  pokemonsli.classList.add("responsive-table");

  const headerList = `
    <li class="table-header">
        <div class="col col-1">Nombre</div>
        <div class="col col-2">Acciones</div>
    </li>`;


  let ulList = '';  
  pokemons.forEach(element => {
    const button = `<input type='button' value='Ver Detalles' onclick='getPokemon("${element.url}")' />`;
    ulList = ulList + `
    
                <li class="table-row">
                  <div class="col col-1" data-label="Nombre">${element.name}</div>
                  <div class="col col-2" data-label="Acciones">${button}</div>
                </li>

    `
  });
  pokemonsli.innerHTML = headerList + ulList;
  poke_container.appendChild(pokemonsli);
};

const createPokemonDetail = (pokemon) => {
    console.log(pokemon);
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const {  name, sprites, weight,height  } = pokemon;
  const pokeInnerHTML = `
    <div class="img-container">
      <img src="${sprites.front_default}" alt="${name}" />
    </div>
    <div class="info">
      <span>Nombre: ${name}</span> 
      <span>Peso: ${weight}</span>
      <span>Altura: ${height}</span>
    </div>
    `;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_detail.innerHTML = '';
  poke_detail.appendChild(pokemonEl); 
};

getAll();
