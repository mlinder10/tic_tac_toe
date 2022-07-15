const mainDiv = document.querySelector("#mainContainer");
const infoLog = document.querySelector("#infoLog");
const buttons = [];
var letter;
var opponetLetter;

const socket = io();

socket.on("player-data", (num) => {
  infoLog.innerHTML = num;
  if (num == 1) {
    letter = "X";
    opponetLetter = "O";
  }
  if (num == 2) {
    letter = "O";
    opponetLetter = "X";
  }
});

socket.on("space", (index) => {
  buttons[index].innerHTML = opponetLetter;
});

function createBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let button = document.createElement("button");
      button.setAttribute("class", "spot");
      button.addEventListener("click", () => {
        button.innerHTML = letter;
        for (let i = 0; i < buttons.length; i++) {
          if (buttons[i] == button) {
            let index = i;
            socket.emit("space", index);
          }
        }
      });
      mainDiv.appendChild(button);
      buttons.push(button);
    }
  }
}

createBoard();
