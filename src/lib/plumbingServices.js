export const plumbingServices = [
  {
    service: "PLUMBING INSTALLATION",
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
        question: "Measurements of the house/premises?",
        options: [
          { option: "Less than 50 m2", custom: false },
          { option: "Between 50/70 m2", custom: false },
          { option: "Between 71/100 m2", custom: false },

          { option: "More than 100 m2", custom: false },
          { option: "I don't know", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Rooms where you need installation? (Kitchen, restroom, ...)",
        type: "Open",
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
