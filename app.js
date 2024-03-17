// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
  
  // DOM
  const btnRules = document.querySelector(".rules-btn");
  const btnClose = document.querySelector(".close-btn");
  const modalRules = document.querySelector(".modal");
  const btnNext = document.querySelector(".nextBtn");
  
  const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results__result");
  
  const resultWinner = document.querySelector(".results__winner");
  const resultText = document.querySelector(".results__text");
  
  const playAgainBtn = document.querySelector(".play-again");
  
  const scoreNumberComputer = document.querySelector(".score__number__computer");
  const scoreNumberUser = document.querySelector(".score__number__user");
  const sectionWinner = document.querySelector('.winnerSection');
  const restart = document.querySelector('.restart');

  let scoreUser = localStorage.getItem('user');
  let scoreComputer = localStorage.getItem('computer');

  // Game Logic
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });

  btnNext.addEventListener('click',()=>{
    sectionWinner.classList.toggle('hidden')
  })

  restart.addEventListener('click',()=>{
    sectionWinner.classList.toggle('hidden');
    toggleWinnerFunction();
  })
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = "YOU WIN AGAINST PC";
        resultDivs[0].classList.toggle("winner");
        btnNext.classList.toggle("hidden");
        keepScore(1);
      } else if (aiWins) {
        resultText.innerText = "YOU LOST  AGAINST PC";
        resultDivs[1].classList.toggle("winner");
        keepScore(-1);
      } else {
        resultText.innerText = "TIE UP";
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
    }, 1000);
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function keepScore(point) {
    // score += point;
    // scoreNumber.innerText = score;
    if(point == -1){
        scoreComputer++;
        scoreNumberComputer.innerText = scoreComputer;
        localStorage.setItem('computer',scoreComputer)
    }else{
        scoreUser++;
        scoreNumberUser.innerText = scoreUser;
        localStorage.setItem('user',scoreUser);
        
    }
  }
  
  // Play Again
  playAgainBtn.addEventListener("click", () => {
    toggleWinnerFunction();
  });

  function toggleWinnerFunction(){
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }
  
  // Show/Hide Rules
  btnRules.addEventListener("click", () => {
    console.log(modalRules)
    modalRules.classList.toggle("show-modal");
  });
  btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });

  function loadData(){
    scoreNumberUser.innerText = scoreUser;
    scoreNumberComputer.innerText = scoreComputer;
  }
  loadData()