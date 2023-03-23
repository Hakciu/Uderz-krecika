const cursor = document.querySelector(".cursor");
const holes = [...document.querySelectorAll(".hole")];
const scoreElement = document.querySelector(".score span");
const startButton = document.querySelector(".start-button");
const startScreen = document.querySelector(".start-screen");
const game = document.querySelector(".game");
const backButton = document.querySelector(".back-button");
const optionsButton = document.querySelector(".options-button");

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  game.style.display = "flex";
  game.style.flexDirection = "column";
  game.style.justifyContent = "center";
  game.style.alignItems = "center";

  run();
});

optionsButton.addEventListener("click", () => {});

let score = 0;

const sound = new Audio("images/smash.mp3");

function run() {
  document.querySelectorAll(".mole").forEach((mole) => mole.remove());
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  console.log(holes[i]);
  let timer = null;

  const img = document.createElement("img");
  img.classList.add("mole");
  img.src = "images/mole.png";

  img.addEventListener("click", () => {
    score++;
    sound.play();
    scoreElement.textContent = score;
    img.src = "images/mole-whacked.png";
    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, 1500);

  backButton.addEventListener("click", () => {
    game.style.display = "none";
    startScreen.style.display = "flex";
    score = 0;
    clearTimeout(timer);
    scoreElement.textContent = score;
  });
}

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});

window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});
