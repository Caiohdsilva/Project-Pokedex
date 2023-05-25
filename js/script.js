// create a function to search pokemons
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1; //LET GLOBAL makes the count start from one and when clicking NEXT advances to 2 and so on
//


const fetchPokemon = async (pokemon) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
 }
}

// function to redefine the data on the screen
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'; 
    pokemonNumber.innerHTML = ''//before running the APP that comes right after, we add this line that says it is loading


    const data = await fetchPokemon(pokemon);

   if (data) {
    pokemonImage.style.display = 'block'; //faz a imagem aparecer 
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
} else {
    pokemonImage.style.display = 'none'; //Makes the image appear
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
}
}

// function to get what was typed in the input and do the search
// as it is a FORM, it has a standard behavior, so in this case it is necessary to block it

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
     // clear the input
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon); //after clicking on next which will receive one more this function will render and show on the screen

});

renderPokemon(searchPokemon);