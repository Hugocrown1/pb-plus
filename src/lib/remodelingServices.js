export const remodelingServices = [
  {
    service: "REMODELING HOME",
    questions: [
      {
        question: "Type of housing",

        options: [
          { option: "Department", custom: false },
          { option: "House", custom: false },
          { option: "Estate", custom: false },
          { option: "Other", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Do you know the measurements of the house?",

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
        question: "Is the current layout of the house being kept?",

        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
          { option: "I don't know, i need advice", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Which rooms do you want to remodel?",

        type: "Open",
      },
      {
        question:
          "What changes will you make in this remodeling? (painting, windows, floor ...)",
        type: "Open",
      },
      {
        question: "Do you already have plans for the remodeling?",

        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
          { option: "I don't know, i need advice", custom: false },
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
