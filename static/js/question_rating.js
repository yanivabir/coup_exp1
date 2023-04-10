// Javascript functions and varialbes for meusring ratings about questions

// This is the list of probes each question should be rated on
var rating_probes = [[{
    prompt: "זה יהיה מועיל בשבילי לדעת את התשובה לשאלה",
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
    required: true,
    name: "useful_pos"
  },
  {
    prompt: "מיותר לדעת את התשובה לשאלה",
    required: true,
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
    name: "useful_neg"
  }],
  [{
    prompt: "אני יודע/ת את התשובה לשאלה בביטחון מלא",
    required: true,
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
    name: "confidence_pos"
  },
  {
    prompt: "אני לגמרי חסר/ת ביטחון לגבי מהי התשובה לשאלה",
    required: true,
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
    name: "confidence_neg"
  }],
  [{
    prompt: "התשובה לשאלה תגרום לי להרגיש טוב יותר כשאקרא אותה",
    required: true,
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
    name: "affect_pos"
  },
  {
    prompt: "התשובה לשאלה תגרום לי להרגיע גרוע יותר כשאקרא אותה",
    required: true,
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
    name: "affect_neg"
  }],
  [{
    prompt: "התשובה לשאלה צפויה להתאים לעמדות והדעות שלי",
    required: true,
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
    name: "congruence_pos"
  },
  {
    prompt: "התשובה לשאלה צפויה לסתור את העמדות והדעות שלי",
    required: true,
    labels: ["1<br>כלל לא מסכימ/ה", "2", "3", "4", "5<br>מסכים מאוד"],
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
  type: "html-button-response",
  timeline: [{
    stimulus: jsPsych.timelineVariable("text")
  }],
  timeline_variables: [{
    text: function(){return "<div id='instruct'><p>בחלק הבא, יוצגו בפניכם " + n_for_ratings * 2 + " שאלות. נבקש שתדרגו את התרשמותכם מהשאלה במספר אופנים.</p>\
      <p>הפעם לא תוצג בפניכם התשובה.</p></div>"}
  },
  {
    text: "<div id='instruct'><p>אנחנו מתעניינים בהתשמותך האישית. לכן, חשוב להסתמך רק על הידע האישי שלך, ולענות ״בשליפה״.</p>\
      <p>לחצ/י על המשך כדי להתחיל בחלק הזה של המחקר.</p></div>",
  }
  ],
  choices: ["המשך"],
  data: {
    category: "rating_instructions1"
  }
}
