// Demographic questions at the end of the experiment
demographic_block = [
  {
    type: "survey-text",
    questions: [{
        prompt: "<div id='instruct'>How old are you?</div>",
        columns: 20,
        rows: 1,
        value: '',
        name: "age"
      }
    ],
    data: {
      category: 'demographics'
    }
  }, {
    type: "survey-multi-choice",
    questions: [{
        prompt: "What is your gender?",
        options: ["Male", "Female", "Other"],
        required: true,
        horizontal: true,
        name: "gender"
      },
      {
        prompt: "What is your race/ethnicity?",
        options: ["American Indian or Alaska Native", "Asian",
          "Black or African American", "Hispanic or Latino/a", "Pacific Islander",
          "White", "Multi-racial", "Prefer not to answer"
        ],
        horizontal: true,
        required: true,
        name: "race"
      },
      {
        prompt: "What is the highest degree or level of school that you have completed? (If you are currently enrolled in school, please indicate the highest degree you have received)?",
        options: ["Did not complete high school", "High school degree or equivalent (e.g. GED)",
          "Some college", "Associate Degree", "Bachelor's Degree",
          "Master's Degree", "Professional Degree (e.g. MD, JD, DDS)", "Doctorate"
        ],
        horizontal: true,
        required: true,
        name: "education"
      },
      {
        prompt: "Is English your native language?",
        options: ["Yes", "No"],
        horizontal: true,
        required: true,
        name: "native_english"
      }
    ],
    data: {
      category: 'demographics'
    }
  },
  {
    type: 'survey-likert',
    questions: [{
      prompt: "How fluent are you in reading and understanding English?",
      labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very fluent"],
      required: true,
      name: "fluent"
    }],
    scale_width: 400,
    data: {
      category: 'demographics'
    }
  },
  {
    type: "survey-text",
    questions: [{
        prompt: "<div id='instruct'>Did you encounter any difficulties while completing the tasks today?</div>",
        columns: 35,
        rows: 2,
        value: '',
        name: "difficult",
        required: true
      },
      {
        prompt: "<div id='instruct'>Was there anything unclear in the instructions?</div>",
        columns: 35,
        rows: 2,
        value: '',
        name: "instructions",
        required: true
      },
      {
        prompt: "<div id='instruct'>Was there anything you did that helped you complete the tasks more easily?</div>",
        columns: 35,
        rows: 2,
        value: '',
        name: "strategy",
        required: true
      }
    ],
    data: {
      category: 'difficulties'
    }
  }, 
]
