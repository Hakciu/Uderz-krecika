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
const przejscie = document.querySelector(".przejscie");
const speed = document.querySelector("#speed");
const live = document.querySelector("#lives");
const golden = document.querySelector("#golden");
const logo = document.querySelector("#logo");
const gif = document.querySelector("#gif");

// Ustawianie max życia na 99999 bo nie chciało mi się tego zmieniać w kodzie
let lives = 99999;
let maxHealth;

if (lives >= 99999) {
  live.checked = false;
  livesChecked.style.display = "none";
  showLives.style.display = "none";
}

// Sprawdzanie ustwień.
let speedChecked = false;
let liveChecked = false;
let goldenChecked = false;

// Włączanie złotych krecików
golden.addEventListener("click", () => {
  if (golden.checked) {
    goldenChecked = true;
  } else {
    goldenChecked = false;
  }
});

// Włączanie żyć i wybór ich wartości
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
    lives = 99999;
    maxHealth = 99999;
    showLives.style.display = "none";
  }
});

// Włączanie zwiększającej się prędkości
speed.addEventListener("click", () => {
  if (speed.checked) {
    speedChecked = true;
  } else {
    speedChecked = false;
  }
});

// Zmienne do losowania czy w danej rundzie pojawi się bomba i złoty krecik
let random1 = 0;
let random2 = 0;

// Obsługa rozpoczynania gry z animacją
startButton.addEventListener("click", () => {
  startButton.classList.add("btnn");

  startButton.addEventListener("transitionend", () => {
    startButton.classList.remove("btnn");
  });

  setTimeout(() => {
    przejscie.classList.add("up");

    przejscie.addEventListener("transitionend", () => {
      przejscie.classList.remove("up");
    });
  }, 200);

  setTimeout(() => {
    startScreen.style.display = "none";
    resultScreen.style.display = "none";
    game.style.display = "flex";
    game.style.flexDirection = "column";
    game.style.justifyContent = "center";
    game.style.alignItems = "center";
  }, 500);

  setTimeout(() => {
    run();
  }, 2000);
});

// Obsługa przejście do opcji z animacją
optionsButton.addEventListener("click", () => {
  optionsButton.classList.add("btnn");

  optionsButton.addEventListener("transitionend", () => {
    optionsButton.classList.remove("btnn");
  });

  setTimeout(() => {
    przejscie.classList.add("up");

    przejscie.addEventListener("transitionend", () => {
      przejscie.classList.remove("up");
    });

    setTimeout(() => {
      startScreen.style.display = "none";
      optionsScreen.style.display = "flex";
      optionsScreen.style.flexDirection = "column";
      optionsScreen.style.justifyContent = "center";
      optionsScreen.style.alignItems = "center";
    }, 500);
  }, 200);
});

// Ustawienie startowych wartości
let score = 0;
let speed1 = 500;
let speed2 = 1000;
let speed3 = 1500;

// Funkcja odpowiadająca za rozpoczącie gry
function run() {
  // Losowanie pojawienie się bomb i złotych krecików
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

  img.setAttribute("draggable", "false");
  img2.setAttribute("draggable", "false");
  img3.setAttribute("draggable", "false");

  img.classList.add("mole");
  img.src = "assets/mole.png";

  // Zwykły krecik
  img.addEventListener("click", () => {
    score++;
    if (speedChecked === true) {
      speed1 -= 5;
      speed2 -= 5;
      speed3 -= 5;
    }
    scoreElement.textContent = score;
    img.src = "assets/mole-whacked.png";
    clearTimeout(timer);
    setTimeout(() => {
      if (img.parentNode === hole) {
        hole.removeChild(img);
        run();
      }
    }, speed1);
  });

  // Bomba
  if (random1 === 0) {
    img3.classList.add("mole");
    img3.src = "assets/bomba3.png";

    img3.addEventListener("click", () => {
      lives--;
      if (lives <= 0) {
        przejscie.classList.add("up");

        przejscie.addEventListener("transitionend", () => {
          przejscie.classList.remove("up");
        });

        setTimeout(() => {
          game.style.display = "none";
          resultScreen.style.display = "flex";
          resultScreen.style.flexDirection = "column";
          resultScreen.style.justifyContent = "center";
          resultScreen.style.alignItems = "center";
          resultResult.textContent = score;
        }, 500);
      }

      if (liveChecked == false) {
        score -= 5;
        if (score <= 0) {
          score = 0;
        }
        scoreElement.textContent = score;
      }
      livesElement.textContent = lives;
      img3.src = "assets/bomba2.png";
      clearTimeout(timer3);
      setTimeout(() => {
        if (img3.parentNode === hole3) {
          hole3.removeChild(img3);
        }
      }, speed1);
    });

    hole3.appendChild(img3);
  }

  // Złoty krecik
  if (goldenChecked == true) {
    if (random2 === 0) {
      img2.classList.add("mole");
      img2.src = "assets/mole2.png";

      setTimeout(() => {
        hole2.appendChild(img2);
      }, 150);

      img2.addEventListener("click", () => {
        score += 5;
        scoreElement.textContent = score;
        img2.src = "assets/mole-whacked2.png";
        clearTimeout(timer2);
        setTimeout(() => {
          hole2.removeChild(img2);
        }, speed1);
      });
    }
  }

  hole.appendChild(img);

  // Usunięcie krecika po upływie czasu. Zmniejszenie punktów o 1
  timer = setTimeout(() => {
    hole.removeChild(img);
    score--;
    if (score < 0) {
      score = 0;
    }
    scoreElement.textContent = score;
    run();
  }, speed3);
}

// Przyciski powrotu
backButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("btnn");

    btn.addEventListener("transitionend", () => {
      btn.classList.remove("btnn");
    });

    setTimeout(() => {
      przejscie.classList.add("up");

      przejscie.addEventListener("transitionend", () => {
        przejscie.classList.remove("up");
      });

      setTimeout(() => {
        game.style.display = "none";
        optionsScreen.style.display = "none";
        resultScreen.style.display = "none";
        startScreen.style.display = "flex";
        score = 0;
        lives = maxHealth;
        scoreElement.textContent = score;
        livesElement.textContent = lives;
      }, 500);
    }, 200);
  });
});

// obliczanie przesuniecie młotka
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY - 15 + "px";
  cursor.style.left = e.pageX + 15 + "px";
});

// Animacja uderzenia
window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});

// Animacja powrotu młotka
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});

// Animacja na ekranie główym. Logo i bomby
window.addEventListener("load", () => {
  logo.classList.add("pulse");

  setTimeout(() => {
    gif.classList.add("gif2");
  }, 10000);

  setTimeout(() => {
    gif.classList.add("gif2");
  }, 35000);
});
