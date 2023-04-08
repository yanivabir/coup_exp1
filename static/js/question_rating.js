// Javascript functions and varialbes for meusring ratings about questions

// This is the list of probes each question should be rated on
var rating_probes = [[{
    prompt: "זה יהיה מועיל בשבילי לדעת את התשובה לשאלה",
    required: true,
    name: "useful_pos"
  },
  {
    prompt: "מיותר לדעת את התשובה לשאלה",
    required: true,
    name: "useful_neg"
  }],
  [{
    prompt: "אני יודע/ת את התשובה לשאלה בביטחון מלא",
    required: true,
    name: "confidence_pos"
  },
  {
    prompt: "אני לגמרי חסר/ת ביטחון לגבי מהי התשובה לשאלה",
    required: true,
    name: "confidence_neg"
  }],
  [{
    prompt: "התשובה לשאלה תגרום לי להרגיש טוב יותר כשאקרא אותה",
    required: true,
    name: "affect_pos"
  },
  {
    prompt: "התשובה לשאלה תגרום לי להרגיע גרוע יותר כשאקרא אותה",
    required: true,
    name: "affect_neg"
  }],
  [{
    prompt: "התשובה לשאלה צפויה להתאים לעמדות והדעות שלי",
    required: true,
    name: "congruence_pos"
  },
  {
    prompt: "התשובה לשאלה צפויה לסתור את העמדות והדעות שלי",
    required: true,
    name: "congruence_neg"
  }]
]

// Choose one of each pair of probes
var chosen_rating_probes = []
for (j = 0; j < rating_probes.length; j++) {
    chosen_rating_probes.push(rating_probes[j][(Math.random()>0.5)+0])  
}

// Rating trial
var rating_trial = [fullscreen_prompt,
  // Introduce questions
  {
    type: "html-button-response",
    stimulus: function() {
      return "<div id='instruct'><p>קראו את השאלה, ודרגו עד כמה אתם מסכימים עם האמירות הבאות המתייחסות אליה:</p>\
      <p><i>" + jsPsych.timelineVariable('question', true) + "</i></p></div>"
    },
    choices: ["המשך"],
    data:{
      category: "rating_intro_question",
      questionId: jsPsych.timelineVariable('questionId')
    }
  },
  // First page of probes
  {
    type: "survey-likert",
    preamble: function() {
      return "<div id='instruct'><p>קראו את השאלה, ודרגו עד כמה אתם מסכימים עם האמירות הבאות המתייחסות אליה:</p>\
      <p><i>" + jsPsych.timelineVariable('question', true) + "</i></p></div>"
    },
    questions: function() {
      return chosen_rating_probes.slice(0, 2)
    },
    scale_width: 400,
    post_trial_gap: 100,
    data:{
      category: "rating_question1",
      questionId: jsPsych.timelineVariable('questionId')
    }
  },
  // Second page of probes
  {
    type: "survey-likert",
    preamble: function() {
      return "<div id='instruct'><p>קראו את השאלה, ודרגו עד כמה אתם מסכימים עם האמירות הבאות המתייחסות אליה:</p>\
      <p><i>" + jsPsych.timelineVariable('question', true) + "</i></p></div>"
    },
    questions: function() {
      if (jsPsych.timelineVariable('block', true) == "coup"){
        return chosen_rating_probes.slice(2, 4)
      }else{
        return chosen_rating_probes.slice(2, 3)
      }
    },
    scale_width: 400,
    post_trial_gap: 300,
    data:{
      category: "rating_question2",
      questionId: jsPsych.timelineVariable('questionId')
    }
  }
]

// Rating instructions
var rating_instructions = {
  type: "instructions",
  pages: [
    "<div id='instruct'><p>In the next part of this experiment, you will be \
    presented with 14 questions. We would like you to rate each of these \
    questions on several scales.</p></div>",
    "<div id='instruct'><p>We are interested in your own personal \
    judgment. Therefore it is important that you rely only on your own \
    knowledge and give your best answer \"off the top of your head.\"</p></div>",
    "<div id='instruct'><p>Press the <i>Next</i> button to begin this part of \
    the experiment.</p></div>"
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "rating_instructions1"
  }
}
