const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/trainers")
      .then(response => response.json())
      .then(response => {
        const trainers = response;
        renderTrainers(trainers);
      });
  });
  
  function renderTrainers(trainers) {
    let main = document.getElementById("main");
    trainers.forEach(trainer => {
      main.innerHTML += ` 
      <div class="card" id = "${trainer.id}" data-id="${trainer.id}"><p>"${
        trainer.name
      }"</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
      `;
      trainer.pokemons.forEach(pokemon => {
        let card = document.getElementById(pokemon.trainer_id);
        card.lastElementChild.innerHTML += `
        <li>${pokemon.nickname} 
        (${pokemon.species}) 
        <button class="release" data-pokemon-id="${
          pokemon.id
        }">Release</button></li>`;
      });
      main.innerHTML += `</ul>
      </div>`;
    });
  }
  
  document.addEventListener("click", e => {
    if (event.target.className === "release") {
      // let trainerId = parseInt(
      //   event.target.parentElement.parentElement.parentElement.dataset.id
      // );
      e.preventDefault();
      let pokemonId = parseInt(event.target.dataset.pokemonId);
      fetch(POKEMONS_URL + `/${pokemonId}`, {
        method: "DELETE"
      }).then(response => response.json());
      event.target.parentElement.innerHTML = "";
    }
  });