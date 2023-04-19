// Demographic questions at the end of the experiment
demographic_block = [
  {
    type: "survey-text",
    questions: [{
        prompt: "<div id='instruct'>גיל:</div>",
        columns: 20,
        rows: 1,
        value: '',
        name: "age"
      }
    ],
    data: {
      category: 'demographics'
    },
    button_label: "המשך"
  }, {
    type: "survey-multi-choice",
    questions: [{
        prompt: "מגדר:",
        options: ["זכר", "נקבה", "אחר"],
        required: true,
        horizontal: true,
        name: "gender"
      },
      {
        prompt: "מהי רמת ההשכלה שלך? (אם את/ה בלימודים כרגע, נא לציין את הרמה הגבוהה ביותר שסיימת)",
        options: ["יסודי", "תיכונית",
          "למדתי במכללה/אוניברסיטה אך לא סיימתי", "תעודה/תואר מקצועי", "תואר ראשון",
          "תואר שני", "תואר שלישי"
        ],
        horizontal: true,
        required: true,
        name: "education"
      },
      {
        prompt: "האם עברית היא שפת האם שלך?",
        options: ["כן", "לא"],
        horizontal: true,
        required: true,
        name: "native_english"
      }
    ],
    data: {
      category: 'demographics'
    },
    button_label: "המשך"
  },
  {
    type: 'survey-likert',
    questions: [{
      prompt: "האם את/ה שולט בקריאה והבנת הנקרא בעברית?",
      labels: ["1<br>כלל לא", "2", "3", "4", "5<br>שולט בהחלט"],
      required: true,
      name: "fluent"
    }],
    scale_width: 400,
    data: {
      category: 'demographics'
    },
    button_label: "המשך"
  },
  {
    type: "survey-text",
    questions: [{
        prompt: "<div id='instruct'>האם נתקלת בקשיים כלשהם בהשלמת המחקר היום?</div>",
        columns: 35,
        rows: 2,
        value: '',
        name: "difficult",
        required: true
      },
      {
        prompt: "<div id='instruct'>האם היה משהו מבלבל בהוראות?</div>",
        columns: 35,
        rows: 2,
        value: '',
        name: "instructions",
        required: true
      },
      {
        prompt: "<div id='instruct'>האם היה משהו שעזר לך להשלים את המשימות יותר בקלות?</div>",
        columns: 35,
        rows: 2,
        value: '',
        name: "strategy",
        required: true
      }
    ],
    data: {
      category: 'difficulties'
    },
    button_label: "המשך"
  }, 
]
