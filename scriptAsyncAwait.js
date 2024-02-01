//Implement your code here 
const p1Name = document.getElementById('p1_name');
const p1ScoreSpan = document.getElementById('p1_score');
const p1Image = document.getElementById('img1');
const p1PokemonName = document.getElementById('name1');
const p1PokemonExperience = document.getElementById('experience1');
const p1PokemonAbilities = document.getElementById('abilities1');

const p2Name = document.getElementById('p2_name');
const p2ScoreSpan = document.getElementById('p2_score');
const p2Image = document.getElementById('img2');
const p2PokemonName = document.getElementById('name2');
const p2PokemonExperience = document.getElementById('experience2');
const p2PokemonAbilities = document.getElementById('abilities2');

let p1Score = 0;
let p2Score = 0;
let a;
let b;
let lengthOfResponce;

player1Name = prompt('Enter the Name of First Player: ');
player2Name = prompt('Enter the Name of Second Player: ');
p1Name.textContent = `${player1Name}`;
p2Name.textContent = `${player2Name}`;

function updateScore() {
    p1ScoreSpan.textContent = `Score: ${p1Score}`;
    p2ScoreSpan.textContent = `Score: ${p2Score}`;
}

updateScore();


async function fetchDetails() {
    console.log('fetching Details');
    
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await res.json();
    lengthOfResponce = (data.results.length);
    console.log(lengthOfResponce);
    let num1 = Math.floor(Math.random() * lengthOfResponce); // Generate random number between 0 and 19
    let num2 = Math.floor(Math.random() * lengthOfResponce); // Generate random number between 0 and 19

    while (num1 === num2) {
        num2 = Math.floor(Math.random() * lengthOfResponce); // Regenerate num2 if it's equal to num1
    }

    let url1 = data.results[num1].url;
    let url2 = data.results[num2].url;
    console.log(url1,url2);
    displayPokemon(url1, url2)
}

async function displayPokemon(url1, url2) {
    let baseExp1;
    let baseExp2;

    const pokemon1 = await fetch(url1);
    const result1Json = await pokemon1.json();
    p1PokemonAbilities.innerHTML='Abilities';
    result1Json.abilities.forEach(element => {
        let ele1 = `<li>${element.ability.name}</li>`;
        p1PokemonAbilities.insertAdjacentHTML("beforeend", ele1);
    });
        
    p1PokemonName.textContent = `${result1Json.forms[0].name}`;
    baseExp1 = result1Json.base_experience;
    console.log("Bese1 :"+baseExp1);
    p1PokemonExperience.textContent = `${result1Json.base_experience}`;
    const imageRes = await fetch(`${result1Json.forms[0].url}`);
    const imageData = await imageRes.json();
    let ele2 = `<img src="${imageData.sprites.front_default}">`
    p1Image.innerHTML ="";
    p1Image.innerHTML = ele2;
         


    const pokemon2 = await fetch(url2);
    const result2Json = await pokemon2.json();
    p2PokemonAbilities.innerHTML='Abilities';
    result2Json.abilities.forEach(element => {
        let ele3 = `<li>${element.ability.name}</li>`;
        p2PokemonAbilities.insertAdjacentHTML("beforeend", ele3);
    });
        
    p2PokemonName.textContent = `${result2Json.forms[0].name}`;
    baseExp2 = result2Json.base_experience;
    console.log("Bese2 :"+baseExp2);
    p2PokemonExperience.textContent = `${result2Json.base_experience}`;
    const imageRes2 = await fetch(`${result2Json.forms[0].url}`);
    const imageData2 = await imageRes2.json();
    let ele4 = `<img src="${imageData2.sprites.front_default}">`
    p2Image.innerHTML ="";
    p2Image.innerHTML = ele4;


    if ( p1PokemonExperience.textContent >  p2PokemonExperience.textContent){
        p1Score++;
    }else{
        p2Score++;
    }
    updateScore();
}



