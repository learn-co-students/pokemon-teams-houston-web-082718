const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const main = document.querySelector("main");
// let currentTrainer;

function getTrainers() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => displayTrainers(data));
}

function displayTrainers(data) {
  let trainersData = data;
  const main = document.querySelector("main");
  trainersData.forEach(function(trainer) {
    // currentTrainer = trainer;
    main.innerHTML += `<div class="card" data-id=${trainer.id}><p>${
      trainer.name
    }</p>
        <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul data-ul-id=${trainer.id}>
        </ul>
      </div>`;
    trainerId = trainer.id;
    trainer.pokemons.forEach(function(pokemon) {
      trainerUl = document.querySelector(`[data-ul-id="${trainerId}"]`);
      trainerUl.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) 
        <button class="release" data-pokemon-id=${
          pokemon.id
        }>Release</button></li>`;
    });
  });
}
//we need to have the listener for when user tries to add pokemon and if there's space, add a new pokemon. create add event listener for add pokemon button. create if statement to see if trainer has < 6 pokemon, and if they have less than 6 then add random pokemon to trainer/card.
document.addEventListener("click", function(event) {
  const addBtn = document.querySelector(".add");
  const releaseBtn = document.querySelector(".release");

  if (event.target.className === "add") {
    const trainerId = event.target.dataset.trainerId;
    //if less than 6 pokemons in the card, then add, else "not allowed"
    debugger;
    //you can query the database to determine the number of pokemons a trainer has or we can traverrse the dom and count the li elements to see how many pokemons are on the front end. This is not fool proof and other method of interacting w DB is preferred.
    if (trainerId.pokemons.length < 6) {
      debugger;
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
        .then();
    } else {
      alert("ERROR");
    }
  }
});

getTrainers();
