export const constructionServices = [
  {
    service: "HOME CONSTRUCTION",
    questions: [
      {
        question: "How many meters do you want the house to be?",
        options: [
          { option: "Between 35/50 m2", custom: false },
          { option: "Between 51/70 m2", custom: false },
          { option: "Between 71/100 m2", custom: false },
          { option: "More than 100 m2", custom: false },
          { option: "I don't know", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Number of floors?",

        options: [
          { option: "Ground floor", custom: false },
          { option: "1 Floor", custom: false },
          { option: "2 Floor", custom: false },
          { option: "More than 2 floor", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "How many bedrooms?",

        options: [
          { option: "1", custom: false },
          { option: "2", custom: false },
          { option: "3 or more", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "How many restrooms?",

        options: [
          { option: "1", custom: false },
          { option: "2", custom: false },
          { option: "3 or more", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Do you already have plans for the construction?",

        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
          { option: "I don't know, i need advice", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Approximate measurements of the land.",
        options: [
          { option: "Less than 50 m2", custom: false },
          { option: "Between 51/100 m2", custom: false },
          { option: "More than 100 m2", custom: false },
          { option: "I don't know", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "When do you want to get the work done?",
        options: [
          { option: "As soon as posible", custom: false },
          { option: "Between 1/3 months", custom: false },
          { option: "More than 3 months", custom: false },
          {
            option: "At the moment, I don't have plans to do it.",

            custom: false,
          },
        ],
        type: "Radio",
      },
    ],
  },
];
