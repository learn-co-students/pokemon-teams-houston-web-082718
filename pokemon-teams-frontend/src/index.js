const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const main = document.querySelector("main");
let trainersData;

function getTrainers() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => displayTrainers(data));
}

function displayTrainers(data) {
  trainersData = data;
  const main = document.querySelector("main");
  trainersData.forEach(function(trainer) {
    main.innerHTML += `<div class="card" data-id=${trainer.id}><p>${
      trainer.name
    }</p>
        <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul data-ul-id=${trainer.id}>
        </ul>
      </div>`;
    trainerId = trainer.id;
    trainer.pokemons.forEach(function(pokemon) {
      addPokemonToTrainer(pokemon, trainerId);
    });
  });
}

function addPokemonToTrainer(pokemon, trainerId) {
  trainerUl = document.querySelector(`[data-ul-id="${trainerId}"]`);
  trainerUl.innerHTML += `<li id=${pokemon.id}>${pokemon.nickname} (${
    pokemon.species
  }) 
      <button class="release" data-pokemon-id=${
        pokemon.id
      }>Release</button></li>`;
}

//we need to have the listener for when user tries to add pokemon and if there's space, add a new pokemon. create add event listener for add pokemon button. create if statement to see if trainer has < 6 pokemon, and if they have less than 6 then add random pokemon to trainer/card.
document.addEventListener("click", function(event) {
  if (event.target.className === "add") {
    const trainerId = parseInt(event.target.dataset.trainerId);
    //if less than 6 pokemons in the card, then add, else "not allowed"
    //you can query the database to determine the number of pokemons a trainer has or we can traverse the DOM and count the li elements to see how many pokemons are on the front end. This is not fool proof and other method of interacting w DB is preferred.
    const trainerObj = trainersData.find(function(trainer) {
      return trainer.id === trainerId;
    });
    //figure out a way for this info to be updated. It's only seen when there's a snapshot of the page at refresh.
    if (trainerObj.pokemons.length < 6) {
      const data = {
        trainer_id: trainerId
      };

      fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(pokemon => {
          // you have a pokemon object. take that and add to DOM
          addPokemonToTrainer(pokemon, trainerId);
        });
    } else {
      alert("ERROR");
    }
  }

  if (event.target.className === "release") {
    const pokemonId = event.target.dataset.pokemonId;
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(removePokeonFromPage(pokemonId, event));
  }
});

function removePokeonFromPage(pokemonId, event) {
  const pokemonLi = document.getElementById(pokemonId);
  pokemonLi.remove();
}

getTrainers();
