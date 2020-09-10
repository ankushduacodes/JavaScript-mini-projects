const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let chosenMaxLife;
let hasBonusLife = true;

let enteredValue = prompt("Enter health = ", "100");
chosenMaxLife = parseInt(enteredValue);

if (isNaN(parseInt(enteredValue)) || enteredValue <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);

function attackPlayer() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife)
}

function gameFinished() {
  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost");
    return true;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won");
    return true;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("It's Draw");
    return true;
  }
  return false;
}
function endRound() {
  let initialPlayerHealth = currentPlayerHealth;
  attackPlayer();
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth)
    hasBonusLife = false;
    removeBonusLife();
    alert("You were saved from bonus life");
  }
  if (gameFinished()) {
    if (confirm("Do you want to play again?")) {
      reset()
    } else {
      attackBtn.disabled = true;
      strongAttackBtn.disabled = true;
      healBtn.disabled = true;
    }
  }
}

function attackMonster(damage) {
  currentMonsterHealth -= dealMonsterDamage(damage);
}

function attack(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  attackMonster(maxDamage);
  endRound();
}

function attackHandler() {
  attack("ATTACK");
}

function strongAttackHander() {
  attack("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't to more than your max intial health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHander);
healBtn.addEventListener("click", healPlayerHandler);