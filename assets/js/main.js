const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('LoadMoreBtn')
const limit = 10;
let offset = 0;

const maxRecords = 151



function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    
                    ${pokemon.types.map((type) => `<li class="type ${type}"> ${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
            </li>
            `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener('click', () => {
    offset += limit

    const qtdeRecordNextPage = offset + limit

    if (qtdeRecordNextPage >= maxRecords) {

        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)

    } else {
        loadPokemonItens(offset, limit)
    }
})





