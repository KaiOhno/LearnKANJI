document.addEventListener('DOMContentLoaded', () => {
  const characters = [
    { char: '水', choices: ['Water', 'Fire', 'Earth'], correct: 'Water' },
    { char: '火', choices: ['Sky', 'Fire', 'Tree'], correct: 'Fire' },
    { char: '木', choices: ['Wood', 'Water', 'Gold'], correct: 'Wood' },
    { char: '金', choices: ['Metal', 'Wood', 'Earth'], correct: 'Metal' },
    { char: '土', choices: ['Fire', 'Water', 'Earth'], correct: 'Earth' },
    { char: '日', choices: ['Sun', 'Moon', 'Star'], correct: 'Sun' },
    { char: '月', choices: ['Moon', 'Sun', 'Earth'], correct: 'Moon' },
    {
      char: '山',
      choices: ['River', 'Mountain', 'Ocean'],
      correct: 'Mountain',
    },
    { char: '川', choices: ['Lake', 'Sea', 'River'], correct: 'River' },
    { char: '海', choices: ['Ocean', 'Mountain', 'Field'], correct: 'Ocean' },
    { char: '星', choices: ['Star', 'Moon', 'Sun'], correct: 'Star' },
    { char: '花', choices: ['Tree', 'Flower', 'Grass'], correct: 'Flower' },
    { char: '草', choices: ['Flower', 'Bush', 'Grass'], correct: 'Grass' },
    { char: '空', choices: ['Air', 'Sea', 'Sky'], correct: 'Sky' },
    { char: '雲', choices: ['Cloud', 'Rain', 'Wind'], correct: 'Cloud' },
    { char: '雨', choices: ['Snow', 'Rain', 'Sunshine'], correct: 'Rain' },
    { char: '風', choices: ['Wind', 'Thunder', 'Lightning'], correct: 'Wind' },
    { char: '雷', choices: ['Thunder', 'Wind', 'Storm'], correct: 'Thunder' },
    { char: '冷', choices: ['Cold', 'Hot', 'Warm'], correct: 'Cold' },
    { char: '暖', choices: ['Warm', 'Cold', 'Cool'], correct: 'Warm' },
    { char: '明', choices: ['Bright', 'Dark', 'Dim'], correct: 'Bright' },
    { char: '暗', choices: ['Dark', 'Bright', 'Light'], correct: 'Dark' },
    { char: '新', choices: ['Old', 'New', 'Ancient'], correct: 'New' },
    { char: '古', choices: ['New', 'Ancient', 'Old'], correct: 'Old' },
    { char: '上', choices: ['Up', 'Down', 'Under'], correct: 'Up' },
    { char: '下', choices: ['Down', 'Up', 'Above'], correct: 'Down' },
  ];

  let currentCharacterIndex = 0;
  let lastCharacterIndex = -1; // Keep track of the last character
  let timer;
  const maxTime = 5000; // Time allowed to answer in milliseconds
  const updateTime = 100; // Timer update interval in milliseconds
  const penaltyTime = 1000; // Time penalty for wrong answer

  const progressBar = document.getElementById('progress-bar');
  const characterDisplay = document.getElementById('character-display');
  const choicesDiv = document.getElementById('choices');
  const choiceButtons = document.querySelectorAll('.choice-button');

  function setProgressBarWidth(width) {
    progressBar.style.width = width + '%';
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function displayCharacter() {
    choiceButtons.forEach(button =>
      button.classList.remove('correct', 'wrong')
    );

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * characters.length);
    } while (newIndex === lastCharacterIndex);

    lastCharacterIndex = newIndex;
    currentCharacterIndex = newIndex;

    const character = characters[currentCharacterIndex];
    characterDisplay.textContent = character.char;

    let shuffledChoices = [...character.choices];
    shuffleArray(shuffledChoices);

    shuffledChoices.forEach((choice, index) => {
      choiceButtons[index].textContent = choice;
    });

    setProgressBarWidth(100);
    startTimer();
  }

  function nextCharacter() {
    stopTimer();
    displayCharacter();
  }

  function startTimer() {
    let timeLeft = maxTime;
    timer = setInterval(() => {
      timeLeft -= updateTime;
      setProgressBarWidth((timeLeft / maxTime) * 100);
      if (timeLeft <= 0) {
        stopTimer();
        nextCharacter();
      }
    }, updateTime);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function applyPenalty() {
    let currentTime = parseFloat(progressBar.style.width);
    let newTime = Math.max(0, currentTime - (penaltyTime / maxTime) * 100);
    setProgressBarWidth(newTime);
  }

  choicesDiv.addEventListener('click', e => {
    if (e.target && e.target.nodeName === 'BUTTON') {
      const selectedChoice = e.target.textContent;
      const correctChoice = characters[currentCharacterIndex].correct;
      choiceButtons.forEach(button =>
        button.classList.remove('correct', 'wrong')
      );

      if (selectedChoice === correctChoice) {
        e.target.classList.add('correct');
        setTimeout(nextCharacter, 100);
      } else {
        e.target.classList.add('wrong');
        applyPenalty();
        setTimeout(() => e.target.classList.remove('wrong'), 1000);
      }
    }
  });

  document
    .getElementById('dark-mode-switch')
    .addEventListener('change', function () {
      document.body.classList.toggle('dark-mode');
    });

  displayCharacter();
});
