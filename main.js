
let containerElement = document.querySelector(".container");
let listElement = document.querySelector("#pokedex");
let allPokemon = [] ; //Aquí guardo los 150 pokemon que me devuelve la API con el for
const input$$ = document.querySelector(".searchInput");

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
        type: element.types.map((type) => type.type.name).join(' - '),
        id: element.id,
    }))
    
}

//4º - Pinto los datos con una función renderPokemon que me pintará todos mis pokemon

const renderPokemon = (characters) => {
    listElement.innerHTML = ""; 

    for (const character of characters){
        listElement.innerHTML += `
        <li class="${character.id}">
            <i class="fas fa-heart"></i>
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.type}</p>
        </li>`         
    }
};
inclusion input and painting elements

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
    console.log(mapeoCharacters)
    renderPokemon(mapeoCharacters);
    listenerInput(mapeoCharacters);
} 

main();

