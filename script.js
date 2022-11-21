const searchIpnut = document.querySelector("#poke-input");
const searchButton = document.querySelector(".search-btn");
const pokeContainer = document.querySelector(".poke-container");
//const pokeStats = document.querySelector(".poke-stats");

let description;
let evolution1;
let evolution2;
let evolution3;

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
const pokeCount = 225;
const evoCount = 225 / 3;

const initPokemon = async () => {
  for (let i = 1, j = 1; i <= pokeCount; i++) {
    //i 1 den başladı çünkü pokemon id leri 1 den başlıyor
    await getDescription(i);
    if (i % 3 == 1) {
      await getEvolution(j);
      j++;
    }
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemonBox(data);
};

const getDescription = async (id) => {
  let desc = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  let aa = await fetch(desc);
  let bb = await aa.json();
  createDescription(bb);
};
const getEvolution = async (id) => {
  let evo = `https://pokeapi.co/api/v2/evolution-chain/${id}/`;
  let cc = await fetch(evo);
  let dd = await cc.json();
  createEvo(dd);
};
const createEvo = (evolutionn) => {
  try {
    console.log(evolutionn);
    evolution1 = evolutionn.chain.species.name;
    evolution2 = evolutionn.chain.evolves_to[0].species.name;
    evolution3 = evolutionn.chain.evolves_to[0].evolves_to[0].species.name;
  } catch (error) {
    console.log("hatalı veri");
  }
};
const createDescription = (descriptionn) => {
  description = descriptionn.flavor_text_entries[0].flavor_text;

  //console.log(description.flavor_text_entries.map((c) => c.flavor_text));
};

const createPokemonBox = (pokemon) => {
  // const sprite = pokemon.sprites.front_default;
  // const { stats, types, species } = pokemon;
  //console.log(pokemon);
  const idPoke = pokemon.id;
  //console.log(idPoke);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //pokemonların baş harfnin büyük yazılmasını sağladık
  const id = pokemon.id.toString().padStart(3, "0"); //idlerin başına 00 koyduk
  const type = pokemon.types.map((a) => a.type.name);
  const color = colors[type];
  const height = pokemon.height;
  const weight = pokemon.weight;
  const moves = pokemon.moves[0].move.name;
  const abilities = pokemon.abilities.map((b) => b.ability.name);
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

   <div class="tab">
   <button class="tablinks" onclick="openCity(event, 'stats', ${idPoke})">About</button>
   <button class="tablinks" onclick="openCity(event, 'about', ${idPoke});
    move(${idPoke},${baseStat1},${baseStat2},${baseStat3},${baseStat4},${baseStat5},${baseStat6});
    ">Stats</button>
   <button class="tablinks" onclick="openCity(event, 'moves', ${idPoke})">Moves</button>
   <button class="tablinks" onclick="openCity(event, 'evolution', ${idPoke})">Evolution</button>
   <button class="tablinks" onclick="openCity(event, 'location', ${idPoke})">Location</button>
   </div> 

<div id="stats${idPoke}" class="tabcontent tabcontent${idPoke} showFirst"> 
<p class="poke-id"># ${idPoke}</p>
<p class="poke-height">Height: ${height}m</p>
<p class="poke-weight">Weight: ${weight}kg</p>
<p class="poke-abilities">Abilities: ${abilities}</p>
<p class="poke-type">Type: ${type}</p>
</div>

<div id="moves${idPoke}" class="tabcontent tabcontent${idPoke}"> 
<p class="poke-id"> ${moves}</p>
</div>

<div id="evolution${idPoke}" class="tabcontent tabcontent${idPoke}"> 
${
  id % 3 == 0
    ? `
    <div>
      <p class="poke-id"># ${evolution1}</p>
      <p class="poke-id"># ${evolution2}</p>
      <p class="poke-id"># ${evolution3}</p>
    </div>
    `
    : id % 3 == 2
    ? `
    <div>
      <p class="poke-id"># ${evolution1}</p>
      <p class="poke-id"># ${evolution2}</p>
    </div>
  `
    : `
    <div>
    <p class="poke-id"># ${evolution1}</p>
    </div>
    `
} 
</div>

<div id="about${idPoke}" class="tabcontent tabcontent${idPoke} ">
<p class="description">${description}</p>

  <div class="poke-stats"> ${stats1}</div>
  <div id="myProgress${idPoke}">
  <div class="myBar1" id="myBar1${idPoke}">${baseStat1}</div>
</div>

<div class="poke-stats"> ${stats2}</div>
<div id="myProgress${idPoke}">
<div class="myBar2" id="myBar2${idPoke}">${baseStat2}</div>
</div>
 
  <div class="poke-stats"> ${stats3}</div>
  <div id="myProgress${idPoke}">
  <div class="myBar3" id="myBar3${idPoke}">${baseStat3}</div>
</div>

  <div class="poke-stats"> ${stats4}</div>
  <div id="myProgress${idPoke}">
  <div class="myBar4" id="myBar4${idPoke}">${baseStat4}</div>
</div>

  <div class="poke-stats"> ${stats5}</div>
  <div id="myProgress${idPoke}">
  <div class="myBar5" id="myBar5${idPoke}">${baseStat5}</div>
</div>

  <div class="poke-stats"> ${stats6}</div>
  <div id="myProgress${idPoke}">
  <div class="myBar6" id="myBar6${idPoke}">${baseStat6}</div>
</div>


 </div> 
  `;
  pokeContainer.appendChild(pokemonEl);
};

var i = 0;
function move(
  idPoke,
  baseStat1,
  baseStat2,
  baseStat3,
  baseStat4,
  baseStat5,
  baseStat6
) {
  if (i == 0) {
    i = 1;
    var elem1 = document.getElementById("myBar1" + idPoke);
    var elem2 = document.getElementById("myBar2" + idPoke);
    var elem3 = document.getElementById("myBar3" + idPoke);
    var elem4 = document.getElementById("myBar4" + idPoke);
    var elem5 = document.getElementById("myBar5" + idPoke);
    var elem6 = document.getElementById("myBar6" + idPoke);

    var width = 1;
    var idPoke = setInterval(frame, 10);
    function frame() {
      if (
        width > baseStat1 &&
        width > baseStat2 &&
        width > baseStat3 &&
        width > baseStat4 &&
        width > baseStat5 &&
        width > baseStat6
      ) {
        clearInterval(idPoke);
        i = 0;
      } else {
        width++;
        elem1.style.width = baseStat1 + "%";
        elem2.style.width = baseStat2 + "%";
        elem3.style.width = baseStat3 + "%";
        elem4.style.width = baseStat4 + "%";
        elem5.style.width = baseStat5 + "%";
        elem6.style.width = baseStat6 + "%";
      }
    }
  }
}

function openCity(evt, cityName, id) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent" + id);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(cityName + id).style.display = "block";
  evt.currentTarget.className += "active";
}
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
