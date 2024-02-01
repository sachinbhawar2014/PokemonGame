const p1_name = document.getElementById("p1_name");
const p1_score = document.getElementById("p1_score");
const img1 = document.getElementById("img1");
const name1 = document.getElementById("name1");
const experience1 = document.getElementById("experience1");
const abilities1 = document.getElementById("abilities1");

const p2_name = document.getElementById("p2_name");
const p2_score = document.getElementById("p2_score");
const img2 = document.getElementById("img2");
const name2 = document.getElementById("name2");
const experience2 = document.getElementById("experience2");
const abilities2 = document.getElementById("abilities2");

let p1Score = 0;
let p2Score = 0;

let p1 = prompt('Enter the First Player Name:');
let p2 = prompt('Enter the Second Player Name:');


p1_name.textContent = `${p1}`;
p2_name.textContent = `${p2}`;


function displayScore(){
    p1_score.textContent = `${p1Score}`;
    p2_score.textContent = `${p2Score}`;
}

displayScore();


async function fetchDetails(){
    const fetchedData = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const responce = await fetchedData.json();
    console.log(responce.results);
    let a = Math.floor(Math.random()*(responce.results.length));
    let b = Math.floor(Math.random()*(responce.results.length));
    while (a === b){
        let b = Math.floor(Math.random()*(responce.results.length));
    }
    const fetchDataOfPokemon1 = await fetch(`${responce.results[a].url}`);
    const res1 = await fetchDataOfPokemon1.json();
    abilities1.innerHTML="Abilities";
    res1.abilities.forEach(ele=>{
        let elem = `<li>${ele.ability.name}</li>`
        abilities1.insertAdjacentHTML("beforeend",elem);

    })
    console.log(res1);
}