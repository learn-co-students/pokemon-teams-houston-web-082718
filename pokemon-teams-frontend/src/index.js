const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener('DOMContentLoaded', () => {
	function fetchAndRender() {
		fetch('http://localhost:3000/trainers')
			.then(resp => resp.json())
			.then(data => {
				trainers = data;
			})
			.then(createTrainerCard);
	}
	fetchAndRender();

	function createTrainerCard() {
		main = document.querySelector('main');
		trainers.forEach(trainer => {
			div = document.createElement('div');
			div.className = 'card';
			div.setAttribute = (`data-id`, `${trainer.id}`);
			div.innerHTML = `
                    <p>${trainer.name}</p>
                    <button class="addPokemon" data-trainer-id="${
						trainer.id
					}">Add Pokemon</button>
                    <ul id='${trainer.name}sPokemon'></ul>`;
			main.appendChild(div);
			list = document.getElementById(`${trainer.name}sPokemon`);
			let pokemon = trainer.pokemons;
			pokemon.forEach(poke => {
				pokemon = document.createElement('li');
				pokemon.id = `${poke.id}`;
				pokemon.setAttribute = (`trainer_id`, `${trainer.id}`);
				pokemon.innerText = `${poke.nickname}(${poke.species})`;
				release = document.createElement('button');
				release.className = 'release';
				release.innerText = 'Release';
				list.appendChild(pokemon);
				pokemon.appendChild(release);
			});
		});
	}

	function addPokemon(trainerId) {
		fetch(`${POKEMONS_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				trainer_id: trainerId
			})
		})
			.then(data => {
				document.querySelector('main').innerHTML = '';
			})
			.then(fetchAndRender);
	}

	function releasePokemon(id) {
		fetch(`${POKEMONS_URL}/${id}`, {
			method: 'DELETE'
		})
			.then(data => {
				document.querySelector('main').innerHTML = '';
			})
			.then(fetchAndRender);
	}

	document.addEventListener('click', function(event) {
		if (event.target.className === 'addPokemon') {
			trainerId = event.target.dataset.trainerId;
			trainerNum = parseInt(trainerId) - 1;
			pokeArray = trainers[trainerNum].pokemons.length;
			console.log(pokeArray);
			if (pokeArray < 6) {
				addPokemon(trainerId);
			}
		} else if (event.target.className === 'release') {
			let id = event.target.parentNode.id;
			releasePokemon(id);
		}
	});
});
