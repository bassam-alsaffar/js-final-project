// Game Configuration
let duration = 1000; 
let currentLevel = 1; 
const maxLevel = 4; 
let wrongTries = 0; 
const levelConfig = {
  1: { pairs: 4 },
  2: { pairs: 6 },
  3: { pairs: 8 },
  4: { pairs: 10 },
};

// DOM Elements
const blocksContainer = document.querySelector(".memory-game-blocks");

// Shuffle Utility Function
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

// Game Setup Function
function setupGame(pairs) {
  console.log('Setting up game with pairs:', pairs);

  // Clear existing blocks
  blocksContainer.innerHTML = '';

  // Create icon pairs
  const icons = [];
  for (let i = 1; i <= pairs; i++) {
    icons.push(`icon-${i}`, `icon-${i}`);
  }

  // Shuffle icons
  shuffle(icons);

  // Create game blocks
  icons.forEach(icon => {
    const block = document.createElement('div');
    block.classList.add('game-block');
    block.dataset.obst = icon;

    // Front face
    const frontFace = document.createElement('div');
    frontFace.classList.add('face', 'front');

    // Back face
    const backFace = document.createElement('div');
    backFace.classList.add('face', 'back');
    const img = document.createElement('img');
    img.src = `./assets/${icon}.png`;
    img.alt = icon;
    backFace.appendChild(img);

    // Append faces to block
    block.appendChild(frontFace);
    block.appendChild(backFace);

    // Append block to container
    blocksContainer.appendChild(block);
  });

  // Add event listeners to blocks
  document.querySelectorAll('.game-block').forEach(block => {
    block.addEventListener('click', flipBlock);
  });
}

// Start Game Function
function startGame(level) {
  console.log('Starting game at level:', level);

  currentLevel = level;
  document.getElementById('level').textContent = currentLevel;
  document.getElementById('wrong-tries').textContent = wrongTries;

  setupGame(levelConfig[currentLevel].pairs);
}

// Flip Block Function
function flipBlock() {
  this.classList.add('is-flipped');

  const flippedBlocks = document.querySelectorAll('.game-block.is-flipped');

  if (flippedBlocks.length === 2) {
    checkMatch(flippedBlocks);
  }
}

// Check Match Function
function checkMatch(flippedBlocks) {
  if (flippedBlocks[0].dataset.obst === flippedBlocks[1].dataset.obst) {
    // Match found
    flippedBlocks.forEach(block => {
      block.classList.add('has-match');
      block.classList.remove('is-flipped');
    });

    checkLevelCompletion();
  } else {
    // No match
    setTimeout(() => {
      flippedBlocks.forEach(block => block.classList.remove('is-flipped'));
    }, duration);

    wrongTries++;
    document.getElementById('wrong-tries').textContent = wrongTries;
  }
}

// Check Level Completion Function
function checkLevelCompletion() {
  const allBlocks = document.querySelectorAll('.game-block');
  const matchedBlocks = document.querySelectorAll('.game-block.has-match');

  if (matchedBlocks.length === allBlocks.length) {
    setTimeout(() => {
      if (currentLevel < maxLevel) {
        alert('Congratulations! You have completed this level.');
        startGame(currentLevel + 1);
      } else {
        alert('Congratulations! You have completed all levels.');
      }
    }, 500);
  }
}

// Reset Game Function
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

// Event Listeners
document.getElementById('submit-name-button').addEventListener('click', function () {
  const userName = document.getElementById('user-name-input').value;

  if (userName) {
    console.log('User name entered:', userName);
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