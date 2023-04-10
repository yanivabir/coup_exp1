// Curiosity rating trials

// Parameters
var minRatingTime = 2000, // minimum question view time
  l_fixationTime = 500;

var l_fixation = {
  // Fixation
  type: 'html-keyboard-response',
  stimulus: '<div id="fixation">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: l_fixationTime,
  data: {
    category: 'rating_l_fixation',
    questionId: jsPsych.timelineVariable('questionId'),
    question: jsPsych.timelineVariable('question'),
    type: jsPsych.timelineVariable('type'),
    block: jsPsych.timelineVariable('block')
  }
};

var curiosity_rating_trial = [
    fullscreen_prompt,
    l_fixation,
  {
  // Curiosity rating
  type: "html-button-response-min-time",
  stimulus: function() {
    return "<div id='instruct'><p>עד כמה את/ה סקרנ/ית לדעת:</p>\
  <p><i>" + jsPsych.timelineVariable('question', true) + "</i></p></div>"
  },
  choices: ["1", "2", "3", "4", "5"],
  min_response_time: minRatingTime,
  prompt: "<div id='satsifaction_prompt'><i>1</i> = כלל לא, <i>5</i> = סקרנ/ית מאוד</div>",
  margin_horizontal: "20px",
  margin_vertical: "80px",
  data: {
    category: "rating_curiosity",
    questionId: jsPsych.timelineVariable('questionId'),
    question: jsPsych.timelineVariable('question'),
    type: jsPsych.timelineVariable('type'),
    block: jsPsych.timelineVariable('block')
  }
},
{
    // Answer
    type: 'html-button-response',
    stimulus: function() {
      return "<div class='answer'>" + jsPsych.timelineVariable('answer', true) + "</div>"
    },
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
      category: 'wait_answer',
      questionId: jsPsych.timelineVariable('questionId'),
      wait_duration: jsPsych.timelineVariable('wait_time'),
      type: jsPsych.timelineVariable('type'),
      block: jsPsych.timelineVariable('block')
    },
    post_trial_gap: 200
  },
  {
    // Satisfaction rating
    type: "html-button-response",
    stimulus: "עד כמה התשובה מספקת?",
    choices: ["1", "2", "3", "4", "5"],
    post_trial_gap: jsPsych.timelineVariable('ITI_next'),
    trial_duration: satisfactionMaxTime,
    prompt: "<div id='satsifaction_prompt'><i>1</i> = בכלל לא, <i>5</i> = מספקת מאוד</div>",
    margin_horizontal: "30px",
    margin_vertical: "80px",
    data: {
      category: "wait_satisfaction",
      ITI_next: jsPsych.timelineVariable('ITI_next'),
      questionId: jsPsych.timelineVariable('questionId'),
      wait_duration: jsPsych.timelineVariable('wait_time'),
      type: jsPsych.timelineVariable('type'),
      block: jsPsych.timelineVariable('block')
    }
  },
  {
    timeline: too_slow,
    conditional_function: function() {
      // Got to answer only if wait selected
      var resp = jsPsych.data.get().
      last(1).select("button_pressed").values[0]

      return resp == null ? true : false
    }
  }];



var curiosity_rating_instructions = {
    type: "html-button-response",
    timeline: [{
      stimulus: jsPsych.timelineVariable("text")
    }],
    timeline_variables: [{
      text: function(){return "<div id='instruct'><p>בחלק הבא, יוצגו בפניכם " + n_for_curiosity * 2 + " שאלות. נבקש שתדרגו את מידת הסקרנות שלכם לדעת את התשובה לכל שאלה.</p>\
        <p>לאחר שתדרגו כל שאלה, תוצג בפניכם התשובה לשאלה. אז נבקש מכם לדרג כמה סיפוק הרגשתם מקריאת התשובה.</p></div>"}
    },
    {
      text: "<div id='instruct'><p>אנחנו מתעניינים בהתרשמותך האישית. לכן, חשוב להסתמך רק על הידע האישי שלך, ולענות ״בשליפה״.</p>\
        <p>לחצ/י על המשך כדי להתחיל בחלק הזה של המחקר.</p></div>",
    }
    ],
    choices: ["המשך"],
    data: {
      category: "curiosity_rating_instructions"
    }
  }
