var card_list = document.getElementsByClassName("card");
const game_board = document.querySelector(".game-board");
var level_list = document.getElementsByClassName("level");
var card_game = document.querySelector(".game-container");
var level_select = document.querySelector(".select-menu");

var cards = [
  { name: "blue" },
  { name: "blue" },
  { name: "red" },
  { name: "red" },
  { name: "orange" },
  { name: "orange" },
  { name: "yellow" },
  { name: "yellow" },
  { name: "green" },
  { name: "green" },
  { name: "black" },
  { name: "black" },
  { name: "pink" },
  { name: "pink" },
  { name: "aqua" },
  { name: "aqua" },
  { name: "brown" },
  { name: "brown" },
  { name: "blueviolet" },
  { name: "blueviolet" },
];

let firt_move = false;
let game = false;
let pick_one, pick_two;
var moves = 0;
var timer = 0;
var right_pick = 0;
var victory = 0;
var score = 0;
var mode;
var penalite, multiplier;

//INIT
document.querySelector(".game-moves").textContent = moves;
document.querySelector(".game-timer").textContent = timer;
document.querySelector(".game-score").textContent = score;
//GAME TIMER
setInterval(function () {
  if (firt_move && right_pick != difficulty / 2) {
    console.log(right_pick);
    document.querySelector(".game-timer").textContent = timer;
    timer++;
    // console.log(timer);

    //UPDATE SCORE
    score = multiplier * right_pick - (penalite * timer + penalite * moves * 5);
    console.log(moves, timer, right_pick);
    if (score < 0) score = 0;
    document.querySelector(".game-score").textContent = score;
  }
}, 1000);

//CHECK FOR VICTORY
setInterval(function showVictScreen() {
  if (difficulty / 2 == right_pick && difficulty != 0 && !victory) {
    // alert(test);
    victory = 1;
    var cont = document.createElement("div");
    cont.classList.add("victory");
    cont.innerHTML =
      "<div class='container'><h1>NICE JOB YOU WIN !</h1><p> Please enter your name so you be can be registred in the leaderboard!</p><form id='form' action='><label for='name' >Your name: </label><input type='text' name='name' id='name' /></form></div>";
    document.querySelector("body").appendChild(cont);
    //SAVE
    if (localStorage) {
      // alert("test");
      document
        .getElementById("form")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          var Name = document.getElementById("name").value;
          //SAVE DATA
          if (Name != "") {
            let new_player = {
              name: Name,
              mode: mode,
              time: timer,
              move: moves,
              score: score,
            };

            //RETRIEVE STORED PLAYER LIST
            var list_str = localStorage.getItem("players");
            if (list_str != null) {
              // SI ELLE EXISTE
              var list = JSON.parse(localStorage.getItem("players"));
            } else {
              //SINON
              var list = [];
            }
            list.push(new_player);
            localStorage.setItem("players", JSON.stringify(list));
            document.getElementById("form").reset();
            //REDIRECTION
            setTimeout(window.location.replace("Leaderboard.html"), 2000);
          }
        });
    }
  }
}, 100);

//GAME BOARD INIT
var difficulty = 0;
chooseDifficulty();

function flip() {
  firt_move = true;
  if (game) return;
  if (pick_one === this) return;

  this.classList.add("flipped");
  click_audio();
  if (!pick_one) {
    pick_one = this;
    return;
  }

  pick_two = this;
  moves++;
  document.querySelector(".game-moves").textContent = moves;
  game = true;
  CheckMatching();
}

//COMPARAISON CARDS
function CheckMatching() {
  console.log(pick_one.dataset.name, pick_two.dataset.name);
  let isMatch = pick_one.dataset.name == pick_two.dataset.name;
  console.log(isMatch);
  isMatch ? DisableCards() : unflip();
}

function DisableCards() {
  pick_one.removeEventListener("click", flip);
  pick_two.removeEventListener("click", flip);
  correct_audio();
  right_pick++;
  resetCards();
}

function unflip() {
  setTimeout(() => {
    pick_one.classList.remove("flipped");
    pick_two.classList.remove("flipped");
    resetCards();
  }, 1000);
}

function resetCards() {
  pick_one = null;
  pick_two = null;
  game = false;
}
//GENERATE CARDS
function generateGame() {
  for (let i = 0; i < difficulty; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("hide");
    card.setAttribute("data-name", cards[i].name);
    card.innerHTML = "<div class='front'></div> <div class='back'></div>";
    const front = card.querySelector(".front");
    front.style = `background: ${cards[i].name}`;
    game_board.appendChild(card);
    card.addEventListener("click", flip);
    card.classList.add("show-animation");
    card.style = `animation-delay: ${i * 200 + "ms"}`;
    card.addEventListener("animationstart", () => {
      card.classList.remove("hide");
      card_audio();
    });
    card.addEventListener("animationend", () => {
      card_audio();
    });
  }
}

//SHUFFLE ALGORITHM (not mine)
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function restartGame() {
  resetCards();
  shuffle(cards);
  game_board.innerHTML = "";
  moves = 0;
  firt_move = false;
  timer = 0;
  right_pick = 0;
  victory = 0;
  score = 0;
  generateGame();
}

function chooseDifficulty() {
  for (let i = 0; i < 3; i++) {
    level_list[i].addEventListener("click", function () {
      if (this.id == "easy") {
        difficulty = 8;
        mode = "Easy";
        penalite = 10;
        multiplier = 1000;
      } else if (this.id == "medium") {
        difficulty = 12;
        mode = "Medium";
        penalite = 20;
        multiplier = 1500;
      } else if (this.id == "hard") {
        mode = "Hard";
        difficulty = 20;
        penalite = 25;
        multiplier = 2000;
      }
      cards = shuffle(cards.slice(0, difficulty));
      generateGame();
      level_select.classList.add("hidden");
      card_game.classList.remove("hidden");
    });
  }
}

//SOUND EFFECTS

function click_audio() {
  let audio = document.createElement("audio");
  audio.src = "sounds/pick.wav";
  // audio.addEventListener(
  //   "ended",
  //   function () {
  //     document.removeChild(this);
  //   },
  //   false
  // );
  audio.play();
}

function correct_audio() {
  let audio = document.createElement("audio");
  audio.src = "sounds/correct.wav";
  // audio.addEventListener(
  //   "ended",
  //   function () {
  //     document.removeChild(this);
  //   },
  //   false
  // );
  audio.play();
}

function card_audio() {
  let audio = document.createElement("audio");
  audio.src = "sounds/card_sound.mp3";
  // audio.addEventListener(
  //   "ended",
  //   function () {
  //     document.removeChild(this);
  //   },
  //   false
  // );
  audio.play();
}
