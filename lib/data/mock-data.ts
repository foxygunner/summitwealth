export const investmentTranches = [
  // READ!!!! make sure you change site config default tranche when you make changes here
  { name: "Basic", fee: 50, cooldownInterval: 7, dailyProfitIncrease: 0.5 },
  { name: "Silver", fee: 100, cooldownInterval: 14, dailyProfitIncrease: 1.0 },
  { name: "Gold", fee: 250, cooldownInterval: 30, dailyProfitIncrease: 1.5 },
  {
    name: "Platinum",
    fee: 500,
    cooldownInterval: 60,
    dailyProfitIncrease: 2.0,
  },
];
