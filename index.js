const symbols = ["#", "*", "&"];

const payouts = {
  "###": 100,
  "***": 80,
  "&&&": 60,
  "##*": 40,
  "*##": 40,
  "#*#": 40,
  "&&*": 20,
  "*&&": 20,
  "&*&": 20,
  "#*&": 10,
  "&*#": 10,
  "*&#": 10,
  "#&*": 10,
};

const reelSpin = async () => {
  return new Promise((resolve) => {
    const spin = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      spin.push(symbols[randomIndex]);
    }
    setTimeout(() => resolve(spin), 1000);
  });
};

let balance = 100;

const placeBet = async () => {
  const amountBet = parseInt(prompt(`Balance: $${balance}\nPlace your bet: `));
  if (isNaN(amountBet) || amountBet <= 0 || amountBet > balance) {
    console.log("Invalid Amount");
    return 0;
  }
  return amountBet;
};

const totalScore = (spin, amountBet) => {
  const combination = spin.join("");
  const payout = payouts[combination] || 0;
  return payout * amountBet || 0;
};

const playSlotMachine = async () => {
  while (balance > 0) {
    const bet = await placeBet();
    if (bet === 0) continue;

    const spin = await reelSpin();
    console.log("Spinning...");
    console.log(spin.join(" | "));

    const score = totalScore(spin);
    if (score > 0) {
      balance += score;
      console.log(`Congrats! You won $${score}. New Balance: $${balance}`);
    } else {
      balance -= bet;
      console.log(`You lost $${bet}. New Balance: $${balance}`);
    }

    if (balance === 0) {
      console.log("Go home, you're broke!!!");
      break;
    }

    const continuePlaying = confirm(
      `Your Balance is $${balance}.\nContinue Playing?`
    );
    if (!continuePlaying) {
      console.log(`Thanks for playing!!! Your Final Balance: $${balance}`);
      break;
    }
  }
};

playSlotMachine();
