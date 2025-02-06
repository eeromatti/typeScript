// interface _Result {
//   periodLength: number;
//   trainingDays: number;
//   success: boolean;
//   rating: number;
//   ratingDescription: string;
//   target: number;
//   average: number;
// }

export const calculateExercises = (target: number, trainHours: number[]) => {
  const nDays = trainHours.length;
  const nTrainDays = trainHours.filter((hours) => hours > 0).length;
  let sumHours = 0;
  trainHours.forEach((num) => {
    sumHours += num;
  });
  const avHours = sumHours / nDays;
  if (target === undefined || trainHours === undefined) {
    return {
      error: "parameters missing",
    };
  }
  if (isNaN(avHours) || isNaN(Number(target))) {
    return {
      error: "malformatted parameters",
    };
  }

  let success: boolean;
  let rating: number;
  let desc: string;
  if (avHours < 0.75 * target) {
    success = false;
    rating = 1;
    desc = "double it";
  } else if (avHours >= 0.75 * target && avHours < target) {
    success = false;
    rating = 2;
    desc = "not too bad";
  } else {
    success = true;
    rating = 3;
    desc = "you're doing great";
  }

  const result = {
    periodLength: nDays,
    trainingDays: nTrainDays,
    success: success,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: avHours,
  };
  return result;
};

const len = process.argv.length - 1;
const target = Number(process.argv[2]);
const hours: number[] = [];
for (let i = 3; i <= len; i++) {
  const value = Number(process.argv[i]);
  if (!isNaN(value)) {
    hours.push(value);
    // console.log("added to the list:", process.argv[i]);
  } else {
    // console.log("Invalid number:", process.argv[i]);
  }
}

// console.log("list:", hours);

console.log(calculateExercises(target, hours));
calculateExercises(target, hours);
