export const initialLearningPath = {
  arrays: [{ challengeInstruction: "Create an empty array", points: 0 }],
  variables: [
    {
      challengeInstruction: "Create a new variable called 'myVar' and assign it a value of 5",
      points: 0,
    },
  ],
  functions: [
    { challengeInstruction: "Create a new function which returns 'Hello World'", points: 0 },
  ],
  objects: [
    {
      challengeInstruction:
        "Create a new object called 'myObj' with a property called 'myProp' and assign it a value of 5",
      points: 0,
    },
  ],
};

export const initialUserSetup = {
  awards: [],
  currentTopic: "variables",
  points: 0,
  totalChallenges: 0,
  functions: {
    awarded: 0,
    completed: false,
  },
  variables: {
    awarded: 0,
    completed: false,
  },
  arrays: {
    awarded: 0,
    completed: false,
  },
  objects: { awarded: 0, completed: false },
};
