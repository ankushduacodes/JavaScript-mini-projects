const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
const LOG_EVENT_GAME_RESET = "GAME_RESET";

let chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

function getMaxLifeValue() {
  let enteredValue = prompt("Enter max health value: ");
  parsedValue = parseInt(enteredValue);

  if (isNaN(parseInt(enteredValue)) || enteredValue <= 0) {
    throw { message: "Invalid User Input type" };
  }
  return parsedValue;
}

try {
  chosenMaxLife = getMaxLifeValue();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert("You entered invalid value, we set the value to 100");
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "Monster";
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = "Player";
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = "Player";
  }
  battleLog.push(logEntry);
}

function attackPlayer() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
}

function attackMonster(monsterDamage) {
  currentMonsterHealth -= dealMonsterDamage(monsterDamage);
  writeToLog(
    LOG_EVENT_PLAYER_ATTACK,
    monsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
  writeToLog(
    LOG_EVENT_GAME_RESET,
    chosenMaxLife,
    currentMonsterHealth,
    currentPlayerHealth
  );
}

function gameFinished() {
  if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Monster Won",
      currentMonsterHealth,
      currentPlayerHealth
    );
    return true;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player Won",
      currentMonsterHealth,
      currentPlayerHealth
    );
    return true;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("It's Draw");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Draw",
      currentMonsterHealth,
      currentPlayerHealth
    );
    return true;
  }
  return false;
}

function endRound() {
  let initialPlayerHealth = currentPlayerHealth;
  attackPlayer();
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    hasBonusLife = false;
    removeBonusLife();
    alert("You were saved from bonus life");
  }
  if (gameFinished()) {
    if (confirm("Do you want to play again?")) {
      reset();
    } else {
      attackBtn.disabled = true;
      strongAttackBtn.disabled = true;
      healBtn.disabled = true;
    }
  }
}

function attack(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  // }
  attackMonster(maxDamage);
  endRound();
}

function attackHandler() {
  attack(MODE_ATTACK);
}

function strongAttackHander() {
  attack(MODE_STRONG_ATTACK);
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
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  console.clear();
  let count = 0;
  for (const logEntry of battleLog) {
    console.log(`#${count}`);
    for (const key in logEntry) console.log(`${key} => ${logEntry[key]}`);
    count++;
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHander);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
