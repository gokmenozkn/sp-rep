export function createTaskObject(taskName, userId) {
  const date = new Date();

  return {
    taskName,
    userId,
    createdAt: date,
    firstRepetition: {
      isDone: false,
      date: addDays(date, 1),
    },
    secondRepetition: {
      isDone: false,
      date: addDays(date, 7),
    },
    thirdRepetition: {
      isDone: false,
      date: addDays(date, 16),
    },
    fourthRepetition: {
      isDone: false,
      date: addDays(date, 35),
    },
  };
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
