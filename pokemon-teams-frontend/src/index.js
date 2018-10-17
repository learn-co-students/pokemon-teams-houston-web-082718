const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers()
});

function fetchTrainers() {
    fetch(TRAINERS_URL).then(resp => resp.json()).then(data => displayTrainers(data));
}

function displayTrainers(trainers) {

    let container = document.querySelector('main')
    container.innerHTML = ""
    trainers.forEach(trainer => {
        container.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button class="add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>   
        <ul id="pokemon-list-${trainer.id}">
        ${getPokemon(trainer.pokemons)}
            
        </ul>
        </div>
        `
    })
}

function getPokemon(arr) {

    let pokeString = "";
    arr.forEach(poke => {

        pokeString += `<li>${poke.nickname}(${poke.species})<button class="release" data-pokemon-id="${poke.id}">Release</button></li>`
    })
    return pokeString;
}

document.addEventListener('click', event => {

    if (event.target.className === 'add-pokemon') {
        addPokemon(event.target.dataset.trainerId)
    } else if (event.target.className === 'release') {
        releasePokemon(event.target.dataset.pokemonId)
    }

})

function addPokemon(id) {

    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: id
        })
    }).then(() => fetchTrainers())

}

function releasePokemon(id) {
    console.log(id);
    let newUrl = `${POKEMONS_URL}/${id}`
    console.log(newUrl);

    fetch(newUrl, {
        method: 'DELETE'
    }).then(() => fetchTrainers())
}