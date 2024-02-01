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


function fetchDetails() {
    console.log('fetching Details');
    // Return the Promise chain
    const responce = fetch("https://pokeapi.co/api/v2/pokemon/")
        .then((res) => res.json())
        .then((data) => {
            lengthOfResponce = (data.results.length);

            let num1 = Math.floor(Math.random() * lengthOfResponce); // Generate random number between 0 and 19
            let num2 = Math.floor(Math.random() * lengthOfResponce); // Generate random number between 0 and 19

            while (num1 === num2) {
                num2 = Math.floor(Math.random() * lengthOfResponce); // Regenerate num2 if it's equal to num1
            }

            let url1 = data.results[num1].url;
            let url2 = data.results[num2].url;
            
            displayPokemon(url1, url2);

            return [(data.results[num1]), (data.results[num2])]; // You can return the data if needed
        })
        .catch(error => {
            console.error('Error fetching details:', error);
            throw error; // Throw the error for further handling if needed
        });
    return responce;
}

function displayPokemon(url1, url2) {
    let baseExp1;
    let baseExp2;
    const pokemon1 = fetch(url1).then((res) => {
        return res.json();
    }).then((res) => {
        p1PokemonAbilities.innerHTML='';
        res.abilities.forEach(element => {
            let ele = `<li>${element.ability.name}</li>`;
            p1PokemonAbilities.insertAdjacentHTML("beforeend", ele);
        });
        p1PokemonName.textContent = `${res.forms[0].name}`;
        baseExp1 = res.base_experience;
        console.log("Bese1 :"+baseExp1);
        p1PokemonExperience.textContent = `${res.base_experience}`;
        const imageRes = fetch(`${res.forms[0].url}`).then((res) => res.json().then((res) => {
            let ele2 = `<img src="${res.sprites.front_default}">`
            p2Image.innerHTML ="";
            p1Image.innerHTML = ele2;
         
        }));
    });

    const pokemon2 = fetch(url2).then((res) => {
        return res.json();
    }).then((res) => {
        p2PokemonAbilities.innerHTML='';
        res.abilities.forEach(element => {
            let ele = `<li>${element.ability.name}</li>`;
            p2PokemonAbilities.insertAdjacentHTML("beforeend", ele);
        });
        p2PokemonName.textContent = `${res.forms[0].name}`
        baseExp2 = res.base_experience;
        console.log("Bese2 :"+baseExp2);
        p2PokemonExperience.textContent = `${res.base_experience}`;
        const imageRes = fetch(`${res.forms[0].url}`).then((res) => res.json().then((res) => {
            let ele2 = `<img src="${res.sprites.front_default}">`
            p2Image.innerHTML = ele2;
           
        }));
    });
    
    if ( p1PokemonExperience.textContent >  p2PokemonExperience.textContent){
        p1Score++;
    }else{
        p2Score++;
    }
    updateScore();
}



