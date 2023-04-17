// Javascript functions and routines for answer reacall task

// Parameters
var minResponseTime = 1500;

// Trial strucutre
var recall_trial = [fullscreen_prompt, {
    type: "html-button-response-min-time",
    stimulus: function() {
      return "<div id'instruct'><p>Do you remember the answer you read last week \
    to this question:</p><p><i>" + jsPsych.timelineVariable('question', true) +
        "</i></p></div>"
    },
    choices: ["Yes", "No"],
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
      preamble: "<div id'instruct'>What answer did you read last week for the question:</div>",
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
      '<div id="instruct"><p>You will now start with recalling the answers to the questions you viewed last week.</p>\
        <p>Last week you were presented with a question and had to decided whether you were interested in waiting to view its answer.</p>\
        <p>You will now be presented with the questions you chose to wait for, one question at a time.</p></div>',
        '<div id="instruct"><p>For each question, we first ask you to indicate whether you remember the answer that was displayed last week.</p>\
        <p>Then we will ask you to write down your best recollection of that answer.</p></div>',
      '<div id="instruct"><p>Please note: It is important that you try to recall the answer <b>as it was displayed to you last week</b>.</div>',
      '<div id="instruct"><p>You will be presented with ' + viewed_answers.length + ' questions.</p><p>Press the <i>Next</i> button to start recalling the answers.</p></div>'
    ]
  },
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "recall_instructions1"
  }
};

function shuffle_viewed_answers(questions) {
  corona_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "corona"))
  general_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "general"))
  third_qs = jsPsych.randomization.shuffle(questions.filter(x => x["block"] == "third"))

  var shuf_questions = [];

  if (firstBlock == "corona") {
    shuf_questions = shuf_questions.concat(corona_qs);
    shuf_questions = shuf_questions.concat(general_qs);
  } else {
    shuf_questions = shuf_questions.concat(general_qs);
    shuf_questions = shuf_questions.concat(corona_qs);
  }

  shuf_questions = shuf_questions.concat(third_qs);

  return shuf_questions
}
