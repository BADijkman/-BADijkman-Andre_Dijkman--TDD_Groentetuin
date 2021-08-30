const getYieldForPlant = (item, factor) => {
  if (!factor) {
    return item.yield;
  }

  let sun = "";
  let wind = "";
  if (item.factors.sun) {
    switch (factor.sun) {
      case "low":
        sun = (100 + item.factors.sun.low) / 100;
        break;
      case "medium":
        sun = (100 + item.factors.sun.medium) / 100;
        break;
      case "high":
        sun = (100 + item.factors.sun.high) / 100;
        break;
    }
  }
  if (item.factors.wind) {
    switch (factor.wind) {
      case "low":
        wind = (100 + item.factors.wind.low) / 100;
        break;
      case "medium":
        wind = (100 + item.factors.wind.medium) / 100;
        break;
      case "high":
        wind = (100 + item.factors.wind.high) / 100;
        break;
    }
  }

  const yieldForPlant = item.yield * sun * wind;
  return yieldForPlant;
};

const getYieldForCrop = (item, factor) => {
  return item.numCrops * getYieldForPlant(item.crop, factor);
};

const getTotalYield = (item, factor) => {
  const resultYieldArray = item.crops.map((element) =>
    getYieldForCrop(element, factor)
  );
  const reducedYieldArray = resultYieldArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return reducedYieldArray;
};

const getCostsForCrop = (item) => {
  return item.crop.costs * item.numCrops;
};

const getRevenueForCrop = (item, factor) => {
  const revenueCrop =
    item.numCrops * getYieldForPlant(item.crop, factor) * item.crop.salePrice;
  return revenueCrop;
};

const getProfitForCrop = (item, factor) => {
  const revenuePlant =
    getYieldForPlant(item.crop, factor) * item.crop.salePrice;
  const revenueCropProf = revenuePlant * item.numCrops;
  const totalCosts = item.crop.costs * item.numCrops;
  const profitCrop = revenueCropProf - totalCosts;
  return profitCrop;
};

const getTotalProfit = (item, factor) => {
  const resultProfitArray = item.crops.map((element) => {
    const revenuePlant =
      getYieldForPlant(element.crop, factor) * element.crop.salePrice;
    const revenueCrop = revenuePlant * element.numCrops;
    const totalCosts = element.crop.costs * element.numCrops;
    const profitCrop = revenueCrop - totalCosts;
    return profitCrop;
  });
  const res = resultProfitArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return res;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
