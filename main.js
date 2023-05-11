
let character = "spearow"
let containerElement = document.querySelector(".container");
let listElement = document.querySelector("#pokemon");
let allPokemon = [] ; //Creo un array vacío donde voy a guardar todos los pokemon que me devuelve JSON
let array150Pokemon = []; //Creo un array vacío para almacenar los primeros 150 pokemons de la API



//2º - Hago la petición a la API usando fetch

const getDataApi = async (namePokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=151${namePokemon}`
    const resp = await fetch (url);
    const respJson = await resp.json(); //Aquí está mi array completo
    /* console.log(respJson);  */

    allPokemon = [...respJson.results]   //Guardo en un array todos los pokemon que me devuelve JSON
    /* console.log(allPokemon); */

    
    //Guardo en la variable el array mapeado en el punto 4º con sólo el nombre del pokemon
    allPokemon = mapeoArray(allPokemon);
    console.log(allPokemon)

    renderPokemon(allPokemon)
    
}

const getDataApiUrl = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/21/`
    const resp = await fetch (url);
    const respJson = await resp.json();
    /* console.log(respJson);  */
}

//3º - Creo un ciclo for para agregar a los 150 primeros pokemons a mi array vacío

for (let i = 0; i < 150; i++){
    array150Pokemon.push(allPokemon[i]);
}

console.log(array150Pokemon); // ************ NO FUNCIONA, PREGUNTAR *********

//4º - Creo una función para mapear el array y quedarnos con las propiedades que me interesan

const mapeoArray = (array) => {
    return array.map((element)=>{
        return {
            name: element.name,
            /* image: element.sprites['front_default'],
            type: element.types.map((type) => type.type.name).join(', '),
            id: element.id  */
        }
    })
}


//5º - Pinto los datos con una función renderPokemon que me pintará todos mis pokemon

const renderPokemon = (allPokemon) => {
    /* containerElement.innerHTML= "" */      //como voy a llamar a esta función más de una vez, cada vez que la llame tengo que limpiarla de nuevo

    for (const pokemon of allPokemon){
        containerElement.innerHTML += `
        <ol id="pokedex">${pokemon.name}</ol>`         //******* QUE PONDRIA EN LA IDE PREGUNTA ***** */
    }


}



//1º - Creo FUNCIÓN DIRECTORA

const main = async () => {
    
const dataApi = await getDataApi();       //Llamo a mi función
getDataApiUrl();

} 

main();

