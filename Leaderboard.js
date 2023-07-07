var table = document.querySelectorAll("tbody tr");
var table_body = document.querySelector("tbody");

retrieveData();
RemplirTop();
RemplirReste();

function RemplirTop() {
  let len = list.length > 3 ? 3 : list.length;
  for (let i = 0; i < len; i++) {
    table[i].children[1].innerHTML = `${list[i].name}`;
    table[i].children[2].innerHTML = `${list[i].mode}`;
    table[i].children[3].innerHTML = `${list[i].time}sec`;
    table[i].children[4].innerHTML = `${list[i].move}`;
    table[i].children[5].innerHTML = `${list[i].score}`;
  }
}

function RemplirReste() {
  if (list.length > 3) {
    for (let i = 3; i < list.length; i++) {
      //creation colonne du tab
      let player = document.createElement("tr");
      player.innerHTML = `<tr><td>${i + 1}</td><td>${list[i].name}</td><td>${
        list[i].mode
      }</td><td>${list[i].time}sec</td><td>${list[i].move}</td><td>${
        list[i].score
      }</td></tr>`;
      console.log(table_body);
      table_body.appendChild(player);
    }
  }
}

function retrieveData() {
  console.log("test data retrieve");
  if (localStorage) {
    var players_list = localStorage.getItem("players");
    if (players_list != null) {
      console.log(JSON.parse(players_list));
      list = JSON.parse(players_list);
    }
  }
  list = list.sort(comparerScore);
}

function comparerScore(a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}
