export const investmentTranches = [
  // READ!!!! make sure you change site config default tranche when you make changes here
  { name: "Basic", fee: 500, cooldownInterval: 7, dailyProfitIncrease: 0.5 },
  { name: "Silver", fee: 5000, cooldownInterval: 14, dailyProfitIncrease: 1.0 },
  { name: "Gold", fee: 25000, cooldownInterval: 30, dailyProfitIncrease: 1.5 },
  {
    name: "Platinum",
    fee: 100000,
    cooldownInterval: 60,
    dailyProfitIncrease: 2.0,
  },
];
