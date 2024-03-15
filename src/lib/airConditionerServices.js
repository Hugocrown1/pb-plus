export const airConditionerServices = [
  {
    service: "PROVIDE AND INSTALL AIR CONDITIONING",
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
        question: "Is there already a pre-installation in place?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],

        type: "Radio",
      },

      {
        question: "Are you interested in any particular brand?",

        options: [
          { option: "York", custom: false },
          { option: "Carrier", custom: false },
          { option: "LG", custom: false },
          { option: "Fujitsu", custom: false },
          { option: "Other", custom: false },
          { option: "No particular brand", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Meters from the compressor to the split?",
        options: [
          { option: "Less than 3 m", custom: false },
          { option: "Between 3/6 m", custom: false },
          { option: "Between 7/14 m", custom: false },
          { option: "More than 14 m", custom: false },
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
