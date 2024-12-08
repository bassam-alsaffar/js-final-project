let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let timer;
let seconds = 0;
let currentLevel = 1;
const maxLevel = 4;
const levelConfig = {
  1: { pairs: 4 },
  2: { pairs: 6 },
  3: { pairs: 8 },
  4: { pairs: 10 }
};
let wrongTries = 0;

function startGame(level) {
  console.log('Starting game at level:', level);
  currentLevel = level;
  document.getElementById('level').textContent = currentLevel;
  document.getElementById('wrong-tries').textContent = wrongTries;
  setupGame(levelConfig[currentLevel].pairs);
}

function setupGame(pairs) {
  console.log('Setting up game with pairs:', pairs);
  const gameBlocks = document.querySelector('.memory-game-blocks');
  gameBlocks.innerHTML = '';

  const icons = [];
  for (let i = 1; i <= pairs; i++) {
    icons.push(`icon-${i}`);
    icons.push(`icon-${i}`);
  }

  shuffle(icons);

  icons.forEach(icon => {
    const block = document.createElement('div');
    block.classList.add('game-block');
    block.dataset.obst = icon;

    const frontFace = document.createElement('div');
    frontFace.classList.add('face', 'front');

    const backFace = document.createElement('div');
    backFace.classList.add('face', 'back');
    const img = document.createElement('img');
    img.src = `./assets/${icon}.png`;
    img.alt = icon;
    backFace.appendChild(img);

    block.appendChild(frontFace);
    block.appendChild(backFace);
    gameBlocks.appendChild(block);
  });

  document.querySelectorAll('.game-block').forEach(block => {
    block.addEventListener('click', flipBlock);
  });
}

function flipBlock() {
  this.classList.add('is-flipped');

  const flippedBlocks = document.querySelectorAll('.game-block.is-flipped');
  if (flippedBlocks.length === 2) {
    if (flippedBlocks[0].dataset.obst === flippedBlocks[1].dataset.obst) {
      flippedBlocks.forEach(block => block.classList.add('has-match'));
      flippedBlocks.forEach(block => block.classList.remove('is-flipped'));
      if (document.querySelectorAll('.game-block.has-match').length === document.querySelectorAll('.game-block').length) {
        setTimeout(() => {
          if (currentLevel < maxLevel) {
            alert('Congratulations! You have completed this level.');
            startGame(currentLevel + 1);
          } else {
            alert('Congratulations! You have completed all levels.');
          }
        }, 500);
      }
    } else {
      setTimeout(() => {
        flippedBlocks.forEach(block => block.classList.remove('is-flipped'));
      }, 1000);
      wrongTries++;
      document.getElementById('wrong-tries').textContent = wrongTries;
    }
  }
}

document.getElementById('submit-name-button').addEventListener('click', function() {
  const userName = document.getElementById('user-name-input').value;
  console.log('User name entered:', userName);
  if (userName) {
    document.querySelector('.user-input-container').style.display = 'none';
    document.querySelector('.info-container').style.display = 'flex';
    document.querySelector('.memory-game-blocks').style.display = 'grid';
    document.querySelector('.button-container').style.display = 'block';
    document.getElementById('user-name').textContent = userName;
    startGame(currentLevel);
  } else {
    alert('Please enter your name.');
  }
});

document.getElementById('new-game-button').addEventListener('click', resetGame);

function resetGame() {
  wrongTries = 0;
  document.getElementById('wrong-tries').textContent = wrongTries;
  currentLevel = 1;
  document.getElementById('level').textContent = currentLevel;
  document.querySelector('.info-container').style.display = 'none';
  document.querySelector('.memory-game-blocks').style.display = 'none';
  document.querySelector('.button-container').style.display = 'none';
  document.querySelector('.user-input-container').style.display = 'block';
  document.getElementById('user-name-input').value = '';
}

function shuffle(array) {
  let current = array.length, temp, random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}