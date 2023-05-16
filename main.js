
let containerElement = document.querySelector(".container");
let listElement = document.querySelector("#pokedex");
let allPokemon = [] ; //Aquí guardo los 150 pokemon que me devuelve la API con el for
const input$$ = document.querySelector(".searchInput");
let arrayFavorites = []; //Aquí guardo mis pokemon marcados como favoritos

//2º - Hago la petición a la API usando fetch

const getDataApi = async () => {
    for (let i=1 ; i <= 150 ; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/`
    const resp = await fetch (url + i);
    const respJson = await resp.json(); //Aquí está mi array completo de los pokemon

    allPokemon.push(respJson);  //Hago un push al array con los pokemon que me ha devuelto respJson

    };

    return allPokemon;
};

//3º - Creo una función para mapear el array y quedarnos con las propiedades que me interesan

const mapeoArray = (arrayOrigin) => {

    return arrayOrigin.map((element) => ({
        name: element.name,
        image: element.sprites['front_default'],
        type: element.types.map ((type) => type.type.name).join(' - '),
        id: element.id,
    }))

}

//6º Escucho el evento del botón favorito

function click (){

const handlerClickFavorite = (ev) => {

    const idFavorite = ev.target.id;       //Guardo el ID del botón que ha sido clicado
    /* console.log(idFavorite); */
   /*  const pokemon = allPokemon.find(e => e.id == idFavorite);
    console.log(pokemon) */
    

    if(!arrayFavorites.includes(idFavorite)){
        arrayFavorites.push(idFavorite);
        ev.target.classList.add("active");
    } else {
        arrayFavorites = arrayFavorites.filter((e)=> e != idFavorite)
        ev.target.classList.remove("active");
    }
    /* console.log(arrayFavorites) */

    renderFavorites()

};

const btnFavorite = document.querySelectorAll(".favorite-button");
  for (const favorite of btnFavorite) {
    favorite.addEventListener('click', handlerClickFavorite);
  }


}

//7º Pinto la parte de favoritos

const renderFavorites = () =>{

    const favoritesContainer = document.querySelector(".favorites-container");
    const favoritesList = document.querySelector("#favorites")
    favoritesList.innerHTML = "<h1>Mis Favoritos</h1>";
    
    for (const favorite of arrayFavorites) {
        favoritesList.innerHTML += `
        <li>
            <img src="${favorite.image}" alt="${favorite.name}">
            <h2>${favorite.name}</h2>
        </li>
        </div>`;
      }

}






//4º - Pinto los datos con una función renderPokemon que me pintará todos mis pokemon

const renderPokemon = (characters) => {
    listElement.innerHTML = "";

    for (const character of characters){
        listElement.innerHTML += `
        <li class="${character.id}">
            <button class="favorite-button"><i class="fas fa-heart" id="${character.id}"></i></button>
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.type}</p>
        </li>`

        click()         //Llamo a la función del evento del botón favorito en el for para que lo pinte cada vez que pinta los pokemons

    }
};


//5º - Escucho el evento del Input de búsqueda y lo pinto

const searchCharacter = (cleanData, value) => {
    const filteredCharacter = cleanData.filter((character) => {
        return character.name.toLowerCase().includes(value.toLowerCase());
    })

renderPokemon(filteredCharacter);
}

const listenerInput = (cleanData) => {

    input$$.addEventListener("input", () =>{

    searchCharacter(cleanData, input$$.value)
    })
}

//1º - Creo FUNCIÓN DIRECTORA

const main = async () => {

    const dataApi = await getDataApi();
    const mapeoCharacters = mapeoArray(dataApi);    //En esta variable guardo mi array mapeado

    renderPokemon(mapeoCharacters);
    listenerInput(mapeoCharacters);
    


}

main();

