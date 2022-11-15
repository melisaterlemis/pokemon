const searchIpnut = document.querySelector("#poke-input");
const searchButton = document.querySelector(".search-btn");
const pokeContainer = document.querySelector(".poke-container");
const pokeStats = document.querySelector(".poke-stats");

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
  const sprite = pokemon.sprites.front_default;
  const { stats, types } = pokemon;
  console.log(pokemon);

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //pokemonların baş harfnin büyük yazılmasını sağladık
  const id = pokemon.id.toString().padStart(3, "0"); //idlerin başına 00 koyduk
  const type = pokemon.types[0].type.name;
  const color = colors[type];
  const stats1 = pokemon.stats[0].stat.name;
  const stats2 = pokemon.stats[1].stat.name;
  const stats3 = pokemon.stats[2].stat.name;
  const stats4 = pokemon.stats[3].stat.name;
  const stats5 = pokemon.stats[4].stat.name;
  const stats6 = pokemon.stats[5].stat.name;
  const baseStat1 = pokemon.stats[0].base_stat;
  const baseStat2 = pokemon.stats[1].base_stat;
  const baseStat3 = pokemon.stats[2].base_stat;
  const baseStat4 = pokemon.stats[3].base_stat;
  const baseStat5 = pokemon.stats[4].base_stat;
  const baseStat6 = pokemon.stats[5].base_stat;

  const progress = document.createElement("div");
  progress.setAttribute("value", baseStat1);
  progress.setAttribute("max", 100);

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = `${color}`;
  pokemonEl.innerHTML = `
  <h3 class="poke-name">${name}</h3>
  <img
    class="poke-img"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
    alt="${name} image"
  />
  <ul>
  <li><a href="#about">About</a></li>
  <li><a href="#stats">Stats</a></li>
  <li><a href="#moves">Moves</a></li>
  <li><a href="#evolution">Evolution</a></li>
  <li><a href="#location">Location</a></li>
</ul>
  <p class="poke-id"># ${id}</p>
  <p class="poke-type">Type: ${type}</p>
  <div class="poke-stats"> ${stats1}</div>
  <div class="poke-stats"> ${baseStat1}</div>
  <div class="poke-stats"> ${stats2}</div>
  <div class="poke-stats"> ${baseStat2}</div>
  <div class="poke-stats"> ${stats3}</div>
  <div class="poke-stats"> ${baseStat3}</div>
  <div class="poke-stats"> ${stats4}</div>
  <div class="poke-stats"> ${baseStat4}</div>
  <div class="poke-stats"> ${stats5}</div>
  <div class="poke-stats"> ${baseStat5}</div>
  <div class="poke-stats"> ${stats6}</div>
  <div class="poke-stats"> ${baseStat6}</div>

</div>
 

  `;
  pokemonEl.appendChild(progress);
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
