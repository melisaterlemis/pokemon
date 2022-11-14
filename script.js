const searchIpnut = document.querySelector("#poke-input");
const searchButton = document.querySelector(".search-btn");
const pokeContainer = document.querySelector(".poke-container");
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f3e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#e0f5ff",
};
const pokeCount = 151;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    //i 1 den başladı çünkü pokemon id leri 1 den başlıyor
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemonBox(data);
};
const createPokemonBox = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //pokemonların baş harfnin büyük yazılmasını sağladık
  const id = pokemon.id.toString().padStart(3, "0"); //dlerin başına 00 koyduk
  const type = pokemon.types[0].type.name;
  const color = colors[type];

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = `${color}`;
  pokemonEl.innerHTML = `
  <img
    class="poke-img"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
    alt="${name} image"
  />
  <h3 class="poke-name">${name}</h3>
  <p class="poke-id"># ${id}</p>
  <p class="poke-type">Type: ${type}</p>
  
  `;
  pokeContainer.appendChild(pokemonEl);
};

initPokemon();
//inputa girdiğimiz değerin hangi pokemonun baş harfiyle başlıyorsa onları filtreler
searchIpnut.addEventListener("input", function (e) {
  const pokeNames = document.querySelectorAll(".poke-name");
  const search = searchIpnut.value.toLowerCase(); //inputa girilen değeri verir

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.style.display = "block";

    if (!pokeName.innerHTML.toLowerCase().includes(search)) {
      pokeName.parentElement.style.display = "none";
    }
  });
});
