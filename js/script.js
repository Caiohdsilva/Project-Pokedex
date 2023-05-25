// criar uma função para fazer as buscar dos pokemons
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1; //LET GLOBAL faz com que a contagem inicie do um e ao clicar em NEXT avance para 2 e assim em diante
//


const fetchPokemon = async (pokemon) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
 }
}

// função para redenrizar os dados na tela
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'; 
    pokemonNumber.innerHTML = ''//antes de executar a APP que vem logo em seguida, adicionamos essa linha que diz que esta carregando


    const data = await fetchPokemon(pokemon);

   if (data) {
    pokemonImage.style.display = 'block'; //faz a imagem aparecer 
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
} else {
    pokemonImage.style.display = 'none'; //Imagem desaparece quando pokemon não é encontrado
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
}
}

// função para pehar o que foi digitado no input e fazer a pesquisa
// como se trata de um FORMULARIO ele possui um comportamento padrão, então nesse caso é necessário bloquea-lo

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
     // limpar o imput
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon); //após clicar em next que vai receber mais um essa funcção vai renderizar e mostrar na tela
});

renderPokemon(searchPokemon);