let xp = 0;
let health = 100;
let gold = 10;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//Main / typescript
xpText.innerText = xp;
goldText.innerText = gold;
healthText.innerText = health;


//OBJECTS JUST LIKE JAVA OOP ====================================================================
const weapon = [
  {
    name: " stick",
    power: 5
  },
  {
    name: " dagger",
    power: 30
  },
  {
    name: " claw hammer",
    power: 50
  },
  {
    name: " sword",
    power: 100
  }
];

const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 30,
    health: 500
  }
]

const locations = [
  {
    name: "town square",
    "button texts": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"store\""

  },
  {
    name: "store",
      "button texts": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to townsquare"],
      "button functions": [buyHealth, buyWeapon, goTown],
    text: "You entered the store"
  },
  {
    name: "cave",
      "button texts": ["Fight slime", "Fight fanged beast", "Go to townsquare"],
      "button functions": [fightSlime, fightBeast, goTown],
    text: "You entered the cave. You see some monsters!!!"
  },
  {
    name: "fight",
      "button texts": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
    text: "You are fighting the monster."
  },
  {
    name: "killed monster",
    "button texts": ["Go to townsquare", "Go to townsquare", "Go to townsquare"],
    "button functions": [goTown, easterEgg, goTown],
    text: 'The monster screams "Arg" as it dies. You gain experience points and find gold'
  },
  {
    name: "lose",
    "button texts": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: " You died. 💀 You'll lose all your progress."
  },
  {
    name: "win",
    "button texts": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: " You defeat the dragon!, Everyone thanked you for saving them! \n\n You win the game! \n\n Take a screenshot and sent it to ernest gwapito"
  },
  {
    name: "easteregg",
    "button texts": ["2", "8", "Go to townsquare"],
    "button functions": [two, eight, goTown],
    text: "You found the hidden room in the game!, pick 1-10 and let's test you luck"

  }
];
//=================================================================================================


//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;



function update(location){

  monsterStats.style.display = "none";

  button1.innerText = location["button texts"][0];
  button2.innerText = location["button texts"][1];
  button3.innerText = location["button texts"][2];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}


function goTown(){
  update(locations[0]);

}
function goStore(){
  update(locations[1]);
  
} 
function goCave(){
  update(locations[2]);
}







//Store=====================================================================================
function buyHealth(){
  if(gold>=10){
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;  
  }else{
    text.innerText = "Not enough money to buy health!";
  }
}

function buyWeapon(){
  if(currentWeapon < weapon.length - 1){

    if(gold>=30){
      gold-=30;
      currentWeapon++;
      goldText.innerText = gold;

      let newWeapon = weapon[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";

      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;

    }else{
      text.innerText = "You do not enough money to buy a weapon!" 
    }

  }else{
    text.innerText = "You have the most powerful weapon";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
function sellWeapon(){

  if(inventory.length >1){
    gold += 15;
    goldText.innerText = gold;
    let removedWeapon = inventory.shift();
    text.innerText = "you sold a " + removedWeapon + ".";
    text.innerText += " In your inventory you have " + inventory;
  }else{
    text.innerText = "Dont sell your only weapon!"
  }
}



//Cave
function fightSlime(){
  fighting = 0;
  goFight();
}
function fightBeast(){
  fighting = 1;
  goFight();
}
function fightDragon(){
  fighting = 2;
  goFight();
}


//fight page=====================================================================================
function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack(){
  
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  health -= monsterDamage(monsters[fighting].level);
  healthText.innerText = health;
  text.innerText += " You attack it with your " + weapon[currentWeapon].name + "."
  
  if(isMonsterHit()){
    monsterHealth -= weapon[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  }else{
    text.innerText = "Your" + weapon[currentWeapon].name + " miss";
  }
  monsterHealthText.innerText = monsterHealth;

  if(health <= 0){
    health = 0;
    healthText.innerText = health;
    lose();
  }else if(monsterHealth <= 0){
    fighting === 2 ?winGame(): defeatMonster(); 
  }  
  //(health <= 0) ? lose() : (monsterHealth <= 0) ? fighting === 2 ?winGame(): defeatMonster(): 'default';


  if(Math.random()<= .1 && inventory.length >1){
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}


function monsterDamage(monsterLevel){
  let damage = (monsterLevel * 5) - Math.floor(Math.random() * xp);
  damage < 0 ? damage = 0 : 'default' ;
  return damage; 
}

function isMonsterHit(){
  return (Math.random()*100)+1 > 20 || health < 20;//percent;
}


function dodge(){
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;

  update(locations[4]);
}
//==================================
function lose(){
  update(locations[5]);
}
function winGame(){
  update(locations[6]);
}
//=====================================================================================
function restart(){
  xp = 0;
  health = 100;
  gold = 10;
  currentWeapon = 0;
  inventory = ["stick"];
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  goTown();
}
function easterEgg(){
  update(locations[7]);
}

function two(){
  easterEggGame(2);
}
function eight(){
  easterEggGame(8);
}

function easterEggGame(pick){

  let randomNumbers = [];
  while(randomNumbers.length<10){
    randomNumbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You pick "+ pick + " and these are the numbers.\n";

  for(let i = 0; i<10; i++){
    text.innerText += randomNumbers[i] + "\n";
  }

  if(randomNumbers.indexOf(pick) !== -1){
    text.innerText += "You Win 10 gold!";
    gold += 10;
    goldText.innerText = gold;
  }else{
    text.innerText += "You lose, i'll take your 20 health";
    health -= 20;
    healthText.innerText = health;
    if(health <= 0){
    health = 0;
    healthText.innerText = health;
    lose();
  }
  }
}







