const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {

    showPokemonCards();

    function showPokemonCards() {
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => {
            const mainContainer = document.querySelector('main');
            mainContainer.innerHTML = "";
            trainers.forEach((trainer) => {
    
                let div = document.createElement('div');
                div.setAttribute('class', 'card');
                div.setAttribute('data-trainer-id', trainer.id);
                div.innerHTML = `<p>${trainer.name}</p>`;
                mainContainer.appendChild(div)
    
                let button = document.createElement('button');
                button.setAttribute('data-trainer-id', trainer.id);
                button.innerHTML = `+`;
                div.appendChild(button);

                button.addEventListener('click', (event) => {

                    if (event.target.parentNode.querySelectorAll('li').length < 6) {
                        fetch(POKEMONS_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                    trainer_id: event.target.dataset.trainerId
                            })
                        })
                        .then(showPokemonCards)
                    }
                })
    
                let ul = document.createElement('ul');
                ul.setAttribute('data-trainer-id', trainer.id);
                trainer.pokemons.forEach((poke) => {
                    ul.innerHTML += `
                        <li>${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">X</button>
                        </li>
                        `
                })
                    
                div.appendChild(ul);
            })
        })
    } // function showPokemonCards

    document.addEventListener('click', (event) => {
        event.preventDefault()

        if (event.target.className === 'release') {

            fetch(POKEMONS_URL + "/" + event.target.dataset.pokemonId, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(resp => resp.json())
            .then(showPokemonCards)

        }
    }) // click release

}) //dom content