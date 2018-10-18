const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
})

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(data => displayTrainers(data))
}

function displayTrainers(data) {
  let trainersData = data
    const main = document.querySelector('main')
    trainersData.forEach(function(trainer) {
      main.innerHTML += `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button class='add' data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul data-ul-id=${trainer.id}>
        </ul>
      </div>`
      trainerId = trainer.id
      trainer.pokemons.forEach(function(pokemon) {
        trainerUl = document.querySelector(`[data-ul-id="${trainerId}"]`)
        trainerUl.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) 
        <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
      })
    })
  }

//when user hits add pokemon, if they have space, a pokemon is added
//create event listener for add pokemon button
document.addEventListener("click", function(event) {
  debugger
  //create if statement to see if trainer has < 6 pokemon
  if (event.target.className === "add") {
    const trainerId = event.target.dataset.trainerId;
    //if less than 6 pokemons in the card, then add, else "not allowed"
    if (currentTrainer.pokemons.length < 6) {
      const data = {
        trainer_id: trainerId
      };
      fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => {
        response.json();
        fetch(POKEMONS_URL).then(response => response.json());
      });
    } else {
      alert("ERROR");
    }
  }
});
getTrainers()

//add random pokemon to trainer in database via fetch
//add random pokemon to trainer html

// fetch(TRAINERS_URL)
// .then(response => response.json())
// .then(json => {
//   let trainersData = json
//   const main = document.querySelector('main')
//   trainersData.forEach(function(trainer) {
//     main.innerHTML += `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
//       <button class='add' data-trainer-id=${trainer.id}>Add Pokemon</button>
//       <ul data-ul-id=${trainer.id}>
//       </ul>
//     </div>`
//     trainerId = trainer.id
//     trainer.pokemons.forEach(function(pokemon) {
//       trainerUl = document.querySelector(`[data-ul-id="${trainerId}"]`)
//       trainerUl.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) 
//       <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
//     })
//   })
// })
