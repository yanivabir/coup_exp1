// Javascript functions and routines for answer reacall task

// Parameters
var minResponseTime = 1500;

// Trial strucutre
var recall_trial = [fullscreen_prompt, {
    type: "html-button-response-min-time",
    stimulus: function() {
      return "<div id'instruct'><p>האם אתם זוכרים את התשובה שקראתם במפגש הקודם לשאלה:</p><p><i>" + jsPsych.timelineVariable('question', true) +
        "</i></p></div>"
    },
    choices: ["כן", "לא"],
    margin_horizontal: "30px",
    margin_vertical: "80px",
    post_trial_gap: 200,
    min_response_time: minResponseTime,
    data: {
      category: "answer_recall_yn",
      question: jsPsych.timelineVariable('question'),
      answer: jsPsych.timelineVariable('answer'),
      questionId: jsPsych.timelineVariable('questionId'),
      block: jsPsych.timelineVariable('block'),
      type: jsPsych.timelineVariable('type')
    }
  },
  {
    timeline: [{
      type: "survey-text",
      preamble: "<div id'instruct'>מה הייתה התשובה שקראת במפגש הקודם לשאלה:</div>",
      questions: [{
        prompt: jsPsych.timelineVariable('question'),
        required: true,
        rows: 3,
        columns: 60,
        name: "recall"
      }],
      post_trial_gap: 200,
      data: {
        category: "answer_recall",
        question: jsPsych.timelineVariable('question'),
        answer: jsPsych.timelineVariable('answer'),
        questionId: jsPsych.timelineVariable('questionId'),
        block: jsPsych.timelineVariable('block'),
        type: jsPsych.timelineVariable('type')
      }
    }],
    conditional_function: function() {
      // Got to answer input only if yes indicated
      var resp = jsPsych.data.get().filter({
        category: "answer_recall_yn"
      }).last(1).select("button_pressed").values[0]

      return (resp == "0") | (resp == 0)  ? true : false
    }
  }
];


// Instructions
var recall_instructions1 = {
  type: 'instructions',
  pages: function() {
    return [
    '<div id = "instruct"><p>תודה שחזרת למפגש נוסף!</p></div>',
      '<div id="instruct"><p>כעת, נבקש ממך להזכר בתשובות לשאלות שקראת במפגש הקודם.</p>\
        <p>במפגש הקודם, הוצגו לך מספר שאלות, ועבור כל אחת החלטת אם לחכות לראות את התשובה, או לדלג הלאה.</p>\
        <p>כעת נציג לך את השאלות שבחרת להמתין עבורן, כל שאלה בתורה.</p></div>',
        '<div id="instruct"><p>עבור כל שאלה, נבקש שתדווחו אם אתם זוכרים את התשובה לשאלה.</p>\
        <p>לאחר מכן נבקש שתכתבו את התשובה כמיטב זכרונכם.</p></div>',
      '<div id="instruct"><p>שימו לב: חשבו שתנסו להזכר בתשובה <b>כפי שהוצגה במפגש הקודם</b>.</div>',
      '<div id="instruct"><p>נציג בפניך ' + viewed_answers.length + ' שאלות.</p><p>לחצו על <i>המשך</i> כדי להתחיל בחלק זה של המחקר.</p></div>'
    ]
  },
  show_clickable_nav: true,
  allow_keys: false,
  button_label_previous: "חזרה",
  button_label_next: "המשך",
  data: {
    category: "recall_instructions1"
  }
};

function shuffle_viewed_answers(questions) {
  coup_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "coup"))
  general_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "general"))

  var shuf_questions = [];

  if (firstBlock == "coup") {
    shuf_questions = shuf_questions.concat(coup_qs);
    shuf_questions = shuf_questions.concat(general_qs);
  } else {
    shuf_questions = shuf_questions.concat(general_qs);
    shuf_questions = shuf_questions.concat(coup_qs);
  }

  return shuf_questions
}
