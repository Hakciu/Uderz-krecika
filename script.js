const cursor = document.querySelector(".cursor");
const holes = [...document.querySelectorAll(".hole")];
const scoreElement = document.querySelector(".score span");
const livesElement = document.querySelector(".lives span");
const startButton = document.querySelector(".start-button");
const startScreen = document.querySelector(".start-screen");
const game = document.querySelector(".game");
const backButtons = document.querySelectorAll(".back-button");
const optionsButton = document.querySelector(".options-button");
const optionsScreen = document.querySelector(".options-screen");
const resultScreen = document.querySelector(".result-screen");
const resultResult = document.querySelector(".result-screen span");
const livesChecked = document.querySelector(".lives-checked");
const lives1 = document.querySelector("#lives-1");
const lives3 = document.querySelector("#lives-3");
const lives5 = document.querySelector("#lives-5");
const ls = document.querySelectorAll(".ls");
const showLives = document.querySelector(".game .lives");

const speed = document.querySelector("#speed");
const live = document.querySelector("#lives");
const golden = document.querySelector("#golden");

let lives = 0;
let maxHealth;

let speedChecked = false;
let liveChecked = false;
let goldenChecked = false;

golden.addEventListener("click", () => {
  if (golden.checked) {
    goldenChecked = true;
  } else {
    goldenChecked = false;
  }
});

live.addEventListener("click", () => {
  if (live.checked) {
    showLives.style.display = "block";
    liveChecked = true;
    livesChecked.style.display = "flex";
    ls.forEach((l) => {
      l.addEventListener("click", () => {
        if (lives1.checked) {
          lives = 1;
          maxHealth = 1;
        } else if (lives3.checked) {
          lives = 3;
          maxHealth = 3;
        } else if (lives5.checked) {
          lives = 5;
          maxHealth = 5;
        }
      });
      lives = 3;
      maxHealth = 3;
    });
  } else {
    live.checked = false;
    livesChecked.style.display = "none";
    lives = 9999;
    maxHealth = 9999;
    showLives.style.display = "none";
  }
});

speed.addEventListener("click", () => {
  if (speed.checked) {
    speedChecked = true;
  } else {
    speedChecked = false;
  }
});

let random1 = 0;
let random2 = 0;

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  resultScreen.style.display = "none";
  game.style.display = "flex";
  game.style.flexDirection = "column";
  game.style.justifyContent = "center";
  game.style.alignItems = "center";

  run();
});

optionsButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  optionsScreen.style.display = "flex";
  optionsScreen.style.flexDirection = "column";
  optionsScreen.style.justifyContent = "center";
  optionsScreen.style.alignItems = "center";
});

let score = 0;

let speed1 = 500;
let speed2 = 1000;
let speed3 = 1500;

const sound = new Audio("images/smash.mp3");

function run() {
  random1 = Math.floor(Math.random() * 2);
  random2 = Math.floor(Math.random() * 4);

  document.querySelectorAll(".mole").forEach((mole) => mole.remove());
  let i, i2, i3;
  do {
    i = Math.floor(Math.random() * holes.length);
    i2 = Math.floor(Math.random() * holes.length);
    i3 = Math.floor(Math.random() * holes.length);
  } while (i === i2 || i === i3 || i2 === i3);

  const hole = holes[i];
  const hole2 = holes[i2];
  const hole3 = holes[i3];
  let timer = null;
  let timer2 = null;
  let timer3 = null;

  const img = document.createElement("img");
  const img2 = document.createElement("img");
  const img3 = document.createElement("img");

  img.classList.add("mole");
  img.src = "images/mole.png";

  img.addEventListener("click", () => {
    score++;
    if (speedChecked === true) {
      speed1 -= 5;
      speed2 -= 5;
      speed3 -= 5;
    }
    scoreElement.textContent = score;
    img.src = "images/mole-whacked.png";
    clearTimeout(timer);
    setTimeout(() => {
      if (img.parentNode === hole) {
        hole.removeChild(img);
        run();
      }
    }, speed1);
  });

  if (random1 === 0) {
    img3.classList.add("mole");
    img3.src = "images/bomba1.webp";

    img3.addEventListener("click", () => {
      lives--;
      if (lives <= 0) {
        game.style.display = "none";
        resultScreen.style.display = "flex";
        resultScreen.style.flexDirection = "column";
        resultScreen.style.justifyContent = "center";
        resultScreen.style.alignItems = "center";
        resultResult.textContent = score;
      }
      livesElement.textContent = lives;
      img3.src = "images/bomba2.png";
      clearTimeout(timer3);
      setTimeout(() => {
        if (img3.parentNode === hole3) {
          hole3.removeChild(img3);
        }
      }, speed1);
    });

    hole3.appendChild(img3);
  }

  if (goldenChecked == true) {
    if (random2 === 0) {
      img2.classList.add("mole");
      img2.src = "images/mole2.png";

      setTimeout(() => {
        hole2.appendChild(img2);
      }, 150);

      img2.addEventListener("click", () => {
        score += 2;
        scoreElement.textContent = score;
        img2.src = "images/mole-whacked2.png";
        clearTimeout(timer2);
        setTimeout(() => {
          hole2.removeChild(img2);
        }, speed1);
      });
    }
  }

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, speed3);

  backButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    });
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

backButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    game.style.display = "none";
    optionsScreen.style.display = "none";
    resultScreen.style.display = "none";
    startScreen.style.display = "flex";
    score = 0;
    lives = maxHealth;
    scoreElement.textContent = score;
    livesElement.textContent = lives;
  });
});
