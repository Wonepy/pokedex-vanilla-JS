const languages = ["french", "japanese", "chinese", "Arabe", "english"]
let index_language = 0
let currentLanguage = languages[index_language]
const languageChanger = document.querySelector(".languageChanger")
languageChanger.innerText = currentLanguage


const app = document.querySelector('.app');
const filterSelectHTML = document.querySelector('select');
const dataBasePath = "./data.json";
const cardsHTML = document.querySelector('.cards');
let pokemonJsonList;

fetch(`${dataBasePath}`)
    .then((json) => json.json())
    .then((AllpokemonsJson)=>{
     pokemonJsonList = AllpokemonsJson;
          AllpokemonsJson.forEach(pokemonJson => {
               renderPokemonCard(createPokemonCard(pokemonJson));

          });
    }
    
    )
    .catch((err) => console.error("Erreur" + err))

const renderPokemonCard = (cardHTML) => {
     cardsHTML.appendChild(cardHTML);
     console.log("Pokemons rendus !")
}


const createPokemonCard = (jsonPokemon) => {
     const card = document.createElement('div');
     card.classList.add('pokemon-card');

     const name = document.createElement('div');
     name.classList.add('pokemon-name');
     

     name.innerText = jsonPokemon.name[currentLanguage]
     if(jsonPokemon.name[currentLanguage] === undefined){
          name.innerText = "no-Data"

     }
     
     

     const pokemonPicture = document.createElement('img');
     pokemonPicture.classList.add('pokemon-img');
     const nbrZero = (3-(jsonPokemon.id.toString()).length)
     const zeroString = "0".repeat(nbrZero)
     pokemonPicture.setAttribute("src", `./thumbnails/${zeroString}${jsonPokemon.id}.png`)
     if (jsonPokemon.id == 0){
          pokemonPicture.setAttribute("src", `./thumbnails/${zeroString}${jsonPokemon.id}.gif`)
     } 
     const types = document.createElement('div');
     types.classList.add('types');

     jsonPokemon.type.forEach(currentType => {
        const type = document.createElement('div');
        type.innerText = currentType
        types.appendChild(type)
        
     });


     card.addEventListener('click', function() {
          // instructions de la fonction
          showpokemonCard(jsonPokemon)
        });


     card.appendChild(name)
     card.appendChild(pokemonPicture)
     card.appendChild(types)

     return card;

}

function showpokemonCard (jsonPokemon) {

     const background = document.createElement('div')
     background.classList.add('bg');


     const menu = document.createElement('div')
     menu.classList.add('menu');
     const scrollY = window.scrollY;
     menu.style.marginTop = `${scrollY + 50}px`;

     const name = document.createElement('div')
     name.classList.add('menu-name');
     
     name.innerText = jsonPokemon.name[currentLanguage]
     if(jsonPokemon.name[currentLanguage] === undefined){
          name.innerText = "no Data"

     }

     
     const pokemonPicture = document.createElement('img');
     pokemonPicture.classList.add('menu-img');
     const nbrZero = (3-(jsonPokemon.id.toString()).length)
     const zeroString = "0".repeat(nbrZero)
     pokemonPicture.setAttribute("src", `./thumbnails/${zeroString}${jsonPokemon.id}.png`)
     if (jsonPokemon.id == 0){
          pokemonPicture.setAttribute("src", `./thumbnails/${zeroString}${jsonPokemon.id}.gif`)
     } 


     const types = document.createElement('div');
     types.classList.add('menu-types');

     jsonPokemon.type.forEach(currentType => {
        const type = document.createElement('div');
        type.classList.add("menu-type");
        type.innerText = currentType;
        types.appendChild(type);
        
     });

     const stats = document.createElement('div')
     stats.classList.add('menu-stats');

     stats.innerHTML = `
     <div class="hp"><strong>PV :</strong>${jsonPokemon.base.HP}</div>
     <div class="attakSpe"><strong>Attaque spéciale : </strong>${jsonPokemon.base["Sp. Attack"]}</div>
     <div class="attakPhys"><strong>Attack :</strong>${jsonPokemon.base["Attack"]}</div>
     <div class="defense"><strong>Defense : </strong>${jsonPokemon.base["Defense"]}</div>
     <div class="defenseSpe"><strong>Defense Spéciale : </strong> ${jsonPokemon.base["Sp. Defense"]}</div>
     <div class="speed"><strong>Vitesse : </strong> ${jsonPokemon.base["Speed"]}</div>
     `;


     const backCross = document.createElement('div')
     backCross.classList.add('croix');
     backCross.innerText = "x";

     const nextCross = document.createElement('img');
     nextCross.classList.add("nextCross");
     nextCross.setAttribute("src", `./assets/arrow.png`)

     backCross.addEventListener('click', () => {
          background.remove();
     
     });

     nextCross.addEventListener('click', ()=>{
          background.remove();
          const nextPokemon = pokemonJsonList.filter((pokemon) => pokemon.id == (jsonPokemon.id + 1))[0];

          showpokemonCard(nextPokemon)
     });

     const buttonInfo = document.createElement('div');
     buttonInfo.classList.add('buttonInfo');

     buttonInfo.innerHTML = `
     
     <form action="https://pokemon.fandom.com/fr/wiki/${jsonPokemon.name.french}" target="_blank">
            <button class="moreInfoButton">Pour plus d'info</button>
     </form>
     
     
     `


     menu.appendChild(name)
     
     menu.appendChild(pokemonPicture) 
     menu.appendChild(stats)
     menu.appendChild(backCross)
     menu.appendChild(types)
     menu.appendChild(buttonInfo)
     menu.appendChild(nextCross)
     background.appendChild(menu)


     app.appendChild(background)

}

function filterCheckedBoxes(checkboxList){
     typesList = []

     checkboxList.forEach(checkbox => {
          if (checkbox.checked){
               typesList.push(checkbox.value)
          }else
          {
               if (typesList.indexOf(checkbox.value) != -1){
                    typesList.filter((current) => current != checkbox.value)
               };
     }
     });
     return typesList
}
const allCheckboxes = document.querySelectorAll('.check')

function filterByType(pokemons, typesList){
     if(typesList.length > 0){
          typesList.forEach(type => {
               /* pokemons.forEach(pokemon => {
                    if(pokemon.type.includes(type)){
                         pokemonListTyped.push(pokemon)
                    }
               }); */
               pokemons = pokemons.filter((pokemon) => pokemon.type.includes(type))
               
          });
     }
     return pokemons
}
     
allCheckboxes.forEach(checkbox => {
     checkbox.addEventListener('change',()=> {
          document.querySelector(".cards").innerHTML = " ";

          filterByType(pokemonJsonList, filterCheckedBoxes(allCheckboxes)).forEach(pokemonJson => {
               renderPokemonCard(createPokemonCard(pokemonJson));

          });
     });
});

document.querySelector('.filterImg').addEventListener('click', ()=> {
     document.querySelector('.sidebar').classList.toggle('active')
})

const inputSearch = document.querySelector("#search-pokemon");
inputSearch.addEventListener('input', function() {
     
     const inputValueLower = inputSearch.value.toLowerCase();

     pokemonJsonListTyped = pokemonJsonList.filter(function(pokemonJson){
          
          return boolInclude = pokemonJson.name[currentLanguage].toLowerCase().includes(inputValueLower);

     
     
     } );
     document.querySelector(".cards").innerHTML = " ";


     filterByType(pokemonJsonListTyped, filterCheckedBoxes(allCheckboxes)).forEach(pokemonJson => {
          renderPokemonCard(createPokemonCard(pokemonJson))});
     
     


});


// Pour changer la langue
languageChanger.addEventListener("click", () => {
     index_language++;
     
     if(index_language>languages.length-1){
          index_language = 0
     }
     
     currentLanguage = languages[index_language]
     languageChanger.innerText = currentLanguage
     
     document.querySelector(".cards").innerHTML = " ";
     
     

          filterByType(pokemonJsonList, filterCheckedBoxes(allCheckboxes)).forEach(pokemonJson => {
               renderPokemonCard(createPokemonCard(pokemonJson))});

})

