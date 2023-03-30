// Javascript functions and varialbes for measuring ratings about questions
var rating_ITI = 500,
  minResponseTime = 1500,
  maxStimDuration = 10000;

// Rating trial
var rating_trial = [fullscreen_prompt,
  {
    // Curiosity rating
    type: 'html-button-response-min-time',
    stimulus: function() {
      return "<i>How curious are you to know:</i><br>" + 
        jsPsych.timelineVariable('question', true) +
        ""} ,
    choices: ["Know","1", "2", "3", "4", "5"],
    prompt: "<div id='satisfaction_prompt'><i>1</i> = Not at all, <i>5</i> = Extremely curious</div>",
    margin_horizontal: "30px",
    margin_vertical: "80px",
    post_trial_gap: rating_ITI,
    trial_duration: maxStimDuration,
    min_response_time: minResponseTime,
    on_load: function(){ // Disable the buttons for the minimal response time so that it's clear
      $('button').prop('disabled', true);
      setTimeout(function(){$('button').prop('disabled', false);}, minResponseTime)
    },
    data: {
      category: "curiosity_rating",
      questionId: jsPsych.timelineVariable('questionId'),
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
  },
]

// Rating instructions
var rating_instructions = {
  type: "instructions",
  pages: [
    "<div id='instruct'><p>In the next part of this experiment, you will be \
    presented with 30 qustions. We would like your curiosity to know the answer \
    to each of these questions.<br>You will rate your curiosity on a scale of \
    <i>1 - Not curious at all</i> to <i>5 - Extremely curious</i></p></div>",
    "<div id='instruct'><p>If you are 100% confident that you know the answer \
    to the question press 'Know' instead of rating your curiosity. \
    Only use this option for questions you are absolutely sure you know the answer to. </p></div>",
    "<div id='instruct'><p>In this study we are interested in your own personal \
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

var post_rating_qs = jsPsych.randomization.shuffle([{
          prompt: "Trivia about animals",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interesting"],
          required: true,
          name: "post_animals"
        },
        {
          prompt: "Trivia about geography",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interesting"],
          required: true,
          name: "post_geography"
        },
        {
          prompt: "Trivia about the arts",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interesting"],
          required: true,
          name: "post_art"
        },
        {
          prompt: "Trivia about food",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interesting"],
          required: true,
          name: "post_food"
        }]);

var post_rating = {
  type: "survey-likert",
  preamble: '<div id="instruct"><p>Plese rate how interesting you found the information, both waiting and rating tasks, presented so far for each topic in this study:</p></div>',
  randomize_question_order: true,
  scale_width: 500,
  data: {
    category: "post_task_preferences"
  },
  timeline: [
    {questions: post_rating_qs.splice(0,2)},
    {questions: post_rating_qs}
  ]
  }