const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  test("Get yield for plant with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
    };
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environmental factors sun=low, wind=hight ", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: -5,
          medium: -10,
          high: -20,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
        sun: {
          low: -30,
          medium: 0,
          high: 60,
        },
        wind: {
          low: 10,
          medium: 0,
          high: -20,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "high",
    };

    //((30*50%)*80%)=12
    expect(getYieldForPlant(corn, environmentFactors)).toBe(12);

    //((4*70%)*80%)=2.24
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBeCloseTo(2.24);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    // 3*10=30
    expect(getYieldForCrop(input)).toBe(30);
  });

  test("Get yield for crop incl environment factors sun=high and wind=medium", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: -5,
          medium: -10,
          high: -20,
        },
      },
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "medium",
    };

    // 10*((30*150%)*90%)= 405
    expect(getYieldForCrop(input, environmentFactors)).toBe(405);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    //(5*3)+(4*2)=23
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];

    //(0*3)=0
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield with multiple crops with environment factors sun=low and wind=high", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: -5,
          medium: -10,
          high: -20,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
        sun: {
          low: -30,
          medium: 0,
          high: 60,
        },
        wind: {
          low: 10,
          medium: 0,
          high: -20,
        },
      },
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    const environmentFactors = {
      sun: "low",
      wind: "high",
    };

    //5*((3*50%)*80%)  + 2((4*70%)80%)  = 10.48
    expect(getTotalYield({ crops }, environmentFactors)).toBeCloseTo(10.48);
  });
});

describe("getCostsForCrop", () => {
  test("Get costs for crop, corn simple", () => {
    const corn = {
      name: "corn",
      yield: 30,
      costs: 1,
    };
    const input = {
      crop: corn,
      numCrops: 230,
    };

    // 230 * 1eur
    expect(getCostsForCrop(input)).toBe(230);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop, corn simple ", () => {
    const corn = {
      name: "corn",
      yield: 30,
      costs: 1,
      salePrice: 2,
    };

    const input = {
      crop: corn,
      numCrops: 20,
    };

    // 30*20*2
    expect(getRevenueForCrop(input)).toBe(1200);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop, simple with corn", () => {
    const corn = {
      name: "corn",
      yield: 30,
      costs: 1,
      salePrice: 2,
    };
    const input = {
      crop: corn,
      numCrops: 20,
    };

    // Revenue - Cost  (20*30*2)-(20*1)= 1180
    expect(getProfitForCrop(input)).toBe(1180);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
    };
    const crops = [
      { crop: corn, numCrops: 20 },
      { crop: pumpkin, numCrops: 10 },
    ];

    // (20*3*2)-(20*1)+(10*4*4)-(10*2)=240
    expect(getTotalProfit({ crops })).toBe(240);
  });

  test("Calculate total profit with multiple crops, with environmental factors sun=med  wind=low", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: -5,
          medium: -10,
          high: -20,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
      factors: {
        sun: {
          low: -30,
          medium: 0,
          high: 60,
        },
        wind: {
          low: 10,
          medium: 0,
          high: -20,
        },
      },
    };

    const crops = [
      { crop: corn, numCrops: 20 },
      { crop: pumpkin, numCrops: 10 },
    ];
    const environmentFactors = {
      sun: "medium",
      wind: "low",
    };

    //tot yield 20((3*100%)*95%)= 57     cost 20*1 =20    sales 57*2   profit 94
    //tot yield 10((4*100%)*110%)= 44    cost 10*2= 20    sales 44*4  profit 156
    //tot profit 94+156 = 250
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(250, 0);
  });
});
