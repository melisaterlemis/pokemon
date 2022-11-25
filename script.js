const searchIpnut = document.querySelector("#poke-input");
const searchButton = document.querySelector(".search-btn");
const pokeContainer = document.querySelector(".poke-container");
const favoriCardList = document.querySelector(".favori-card-list");
const digerCardList = document.querySelector(".diger-card-list");
let description;

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
const pokeCount = 25;
//const evoCount = 225 / 3;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    //i 1 den başladı çünkü pokemon id leri 1 den başlıyor
    await getPokemon(i);
  }
};

const getPokemon = async (id, showCount = 0) => {
  let evolution = [];
  let images = [];
  let data = [];

  let evo = `https://pokeapi.co/api/v2/evolution-chain/${id}`;
  let cc = await fetch(evo)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
    });
  let dd = await cc.json();

  let evolution1 = dd.chain.species.name;
  evolution.push(evolution1);
  if (dd.chain.evolves_to.length) {
    let evolution2 = dd.chain.evolves_to[0].species.name;
    evolution.push(evolution2);
    if (dd.chain.evolves_to[0].evolves_to.length) {
      let evolution3 = dd.chain.evolves_to[0].evolves_to[0].species.name;
      evolution.push(evolution3);
    }
  }

  for (let i = 1; i <= evolution.length; i++) {
    //i 1 den başladı çünkü pokemon id leri 1 den başlıyor
    let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${i}.png`;
    images.push(imageUrl);
  }
  // pokemon apiden evolution name ine göre pokemonları çektik o evolutiondaki pokemonları aynı pokeboxta göstermek için data.data adlı diziye aktardık
  let pokemonResponse = [];
  for (let i = 0; i < evolution.length; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${evolution[i]}`;
    let res = await fetch(url);
    pokemonResponse.push(await res.json());
  }
  data.data = pokemonResponse;
  data.evolution = evolution;
  data.images = images;
  // console.log(data);
  let desc = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  let aa = await fetch(desc);
  let bb = await aa.json();
  data.description = bb.flavor_text_entries[0].flavor_text;

  let type = data.data[showCount].types.map((a) => a.type.name);
  let color = colors[type];

  let pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.classList.add("poke-box" + id);
  pokemonEl.style.backgroundColor = `${color}`;

  pokemonEl.innerHTML = GetPokeBox(id, data, showCount);

  pokeContainer.appendChild(pokemonEl);
  digerCardList.appendChild(pokeContainer);
};

initPokemon();

function SetPokeBox(id, data, showCount) {
  let pokemonEl = document.getElementsByClassName("poke-box" + id);
  pokemonEl.innerHTML = GetPokeBox(
    id,
    data,
    showCount + 1 >= data.evolution.length ? 0 : showCount + 1
  );
}

const GetPokeBox = (id, data, showCount) => {
  let evolution = data.evolution;
  let type = data.data[showCount].types.map((a) => a.type.name);

  let moves = data.data[showCount].moves[0].move.name;
  let abilities = data.data[showCount].abilities.map((b) => b.ability.name);
  let stats1 = data.data[showCount].stats[0].stat.name;
  let stats2 = data.data[showCount].stats[1].stat.name;
  let stats3 = data.data[showCount].stats[2].stat.name;
  let stats4 = data.data[showCount].stats[3].stat.name;
  let stats5 = data.data[showCount].stats[4].stat.name;
  let stats6 = data.data[showCount].stats[5].stat.name;
  let baseStat1 = data.data[showCount].stats[0].base_stat;
  let baseStat2 = data.data[showCount].stats[1].base_stat;
  let baseStat3 = data.data[showCount].stats[2].base_stat;
  let baseStat4 = data.data[showCount].stats[3].base_stat;
  let baseStat5 = data.data[showCount].stats[4].base_stat;
  let baseStat6 = data.data[showCount].stats[5].base_stat;
  return `
      <button class="favori-class${id}" onclick="star(${id})"><span class="fa fa-star"></span></button>

      <button id="back-id${id}" 
      onclick="() => {SetPokeBox(${id}, ${data}, ${showCount})}" class="back-class")
      <span class="fa-solid fa-angle-left">></span>
      </button>
      <h3 class="poke-name">${data.data[showCount].name}</h3>
      <img
        class="poke-img"
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.data[
          showCount
        ].id
          .toString()
          .padStart(3, "0")}.png"
        alt="${data.data[showCount].name} image"
      />
    
       <div class="tab">
       <button class="tablinks active" onclick="openCity(event, 'stats', ${id})">About</button>
       <button class="tablinks active" onclick="openCity(event, 'about', ${id});
        move(${id},${baseStat1},${baseStat2},${baseStat3},${baseStat4},${baseStat5},${baseStat6});
        ">Stats</button>
       <button class="tablinks active" onclick="openCity(event, 'moves', ${id})">Moves</button>
       <button class="tablinks active" onclick="openCity(event, 'evolution', ${id});">Evolution</button>
       <button class="tablinks active" onclick="openCity(event, 'location', ${id})">Location</button>
       </div> 
    
    <div id="stats${id}" class="tabcontent tabcontent${id} showFirst "> 
    <p class="poke-id"># ${id}</p>
    <p class="poke-height">Height: ${data.data[showCount].height}m</p>
    <p class="poke-weight">Weight: ${data.data[showCount].weight}kg</p>
    <p class="poke-abilities">Abilities: ${abilities}</p>
    <p class="poke-type">Type: ${type}</p>
    </div>
    
    <div id="moves${id}" class="tabcontent tabcontent${id}"> 
    <p class="poke-id"> ${moves}</p>
    </div>
    
    <div id="evolution${id}" class="tabcontent tabcontent${id}"  > 
    <p class="poke-evo1">${evolution}</p>
    </div>
    
    <div id="about${id}" class="tabcontent tabcontent${id} ">
    <p class="description">${data.data[showCount].description}</p>
    
      <div class="poke-stats"> ${stats1}</div>
      <div id="myProgress${id}">
      <div class="myBar1" id="myBar1${id}">${baseStat1}</div>
    </div>
    
    <div class="poke-stats"> ${stats2}</div>
    <div id="myProgress${id}">
    <div class="myBar2" id="myBar2${id}">${baseStat2}</div>
    </div>
     
      <div class="poke-stats"> ${stats3}</div>
      <div id="myProgress${id}">
      <div class="myBar3" id="myBar3${id}">${baseStat3}</div>
    </div>
    
      <div class="poke-stats"> ${stats4}</div>
      <div id="myProgress${id}">
      <div class="myBar4" id="myBar4${id}">${baseStat4}</div>
    </div>
    
      <div class="poke-stats"> ${stats5}</div>
      <div id="myProgress${id}">
      <div class="myBar5" id="myBar5${id}">${baseStat5}</div>
    </div>
    
      <div class="poke-stats"> ${stats6}</div>
      <div id="myProgress${id}">
      <div class="myBar6" id="myBar6${id}">${baseStat6}</div>
    </div>
     </div> 
     </div>
      `;
};

function move(
  dataid,
  baseStat1,
  baseStat2,
  baseStat3,
  baseStat4,
  baseStat5,
  baseStat6
) {
  var elem1 = document.getElementById("myBar1" + dataid);
  var elem2 = document.getElementById("myBar2" + dataid);
  var elem3 = document.getElementById("myBar3" + dataid);
  var elem4 = document.getElementById("myBar4" + dataid);
  var elem5 = document.getElementById("myBar5" + dataid);
  var elem6 = document.getElementById("myBar6" + dataid);
  if (baseStat1 < 100) {
    elem1.style.width = baseStat1 + "%";
  } else {
    elem1.style.width = 100 + "%";
  }
  if (baseStat2 < 100) {
    elem2.style.width = baseStat2 + "%";
  } else {
    elem2.style.width = 100 + "%";
  }
  if (baseStat3 < 100) {
    elem3.style.width = baseStat3 + "%";
  } else {
    elem3.style.width = 100 + "%";
  }
  if (baseStat4 < 100) {
    elem4.style.width = baseStat4 + "%";
  } else {
    elem4.style.width = 100 + "%";
  }
  if (baseStat5 < 100) {
    elem5.style.width = baseStat5 + "%";
  } else {
    elem5.style.width = 100 + "%";
  }
  if (baseStat6 < 100) {
    elem6.style.width = baseStat6 + "%";
  } else {
    elem6.style.width = baseStat6 + "%";
  }
}

function star(dataid) {
  var starEl = document.getElementsByClassName("favori-class" + dataid);
  var ss = starEl[0].parentNode;
  var buton = starEl[0].childNodes;
  buton[0].classList.add("checked");
  var favori = document.querySelector(".favori-card-list");
  favori.appendChild(ss);
}

function openCity(evt, cityName, id) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent" + id);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks active");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(cityName + id).style.display = "block";
  evt.currentTarget.className += "active";
}

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
