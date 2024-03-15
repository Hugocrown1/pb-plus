export const electricalServices = [
  {
    service: "DISTRIBUTION BOX INSTALATION",
    questions: [
      {
        question: "Home voltage",
        options: [
          { option: "120V", custom: false },
          { option: "240v", custom: false },
          { option: "Both", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "How many do you need",
        options: [
          { option: "1", custom: false },
          { option: "2/3", custom: false },
          { option: "4/5", custom: false },
          { option: "More", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Is it any wiring pending in your home?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Do you need any breakers?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
    ],
  },

  {
    service: "NEW HOME WIRING",
    questions: [
      {
        question: "Home voltage",
        options: [
          { option: "120V", custom: false },
          { option: "240V", custom: false },
          { option: "Both", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Construction Ft²/m²",
        options: [
          { option: "300-500 Ft² / 90-150 m²", custom: false },
          { option: "500-700 Ft² / 150-210 m²", custom: false },
          { option: "700-900 Ft² / 210-280m²", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },

      {
        question: "Construction type?",
        options: [
          { option: "Concrete", custom: false },
          { option: "Wood", custom: false },
          { option: "Metal", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },
      {
        question: "Construction location?",
        type: "Open",
      },
    ],
  },

  {
    service: "HOME IMPROVEMENT WIRING",
    questions: [
      {
        question: "Home voltage",
        options: [
          { option: "120V", custom: false },
          { option: "240V", custom: false },
          { option: "Both", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Construction Ft²/m²",
        options: [
          { option: "300-500 Ft² / 90-150 m²", custom: false },
          { option: "500-700 Ft² / 150-210 m²", custom: false },
          { option: "700-900 Ft² / 210-280m²", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },

      {
        question: "Does the area have electrical outlets?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Do you require distribution box?",
        options: [
          { option: "Yes", custom: false },
          { option: "No", custom: false },
        ],
        type: "Radio",
      },
      {
        question: "Construction type?",
        options: [
          { option: "Concrete", custom: false },
          { option: "Wood", custom: false },
          { option: "Metal", custom: false },
          { option: "OTHER", custom: true },
        ],
        type: "Radio",
      },

      {
        question: "Construction location?",
        type: "Open",
      },
    ],
  },
];
