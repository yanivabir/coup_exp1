// Javascript functions and routines for waiting task ------------------------
// This file contains the needed variables and functions to run the waiting task on your
// main js file. In order to do so, you use 'wait_timeline', defining a block of the waiting task
// like this:
//    block = {
//      timeline: wait_timeline,
//      timeline_variables: items
//    }
//
// where items is an array of objects, each defining a trial. Each trial has the following attributes:
// questionId: and identifier for the question
// question: the text of the question
// answer: the text of the answer
// type: another string describing the question. could be an experimental variable
//
// Additionally, drawTimes(itmes) needs to be run on the array items to add waiting times and ITIs, 
// based on the parameters below.

// Parameters
var maxStimDuration = 10000, // Response deadline for questions
  minResponseTime = 1500, // Minimum response time for questions
  satisfactionMaxTime = 3500, // Maximum response time for satisfaction rating
  maxAnswerTime = 7000, // Response deadline for answers
  fixationTime = 500, // Duration of fixation period b/w trials
  maxTaskTime = 20, // Total duration of block
  waits = [3, 4, 5, 6, 7, 8, 9], // Wait times in task
  ITI_range = [500, 1200]; // Range of ITIs in task. Drawn from a uniform distribution on this range.

// Get participant id form url
var PID = jsPsych.data.getURLVariable('workerId');
// Is this a debug run?
var short = PID.includes("short");

maxTaskTime = short ? 3 : maxTaskTime;

// WTW Trials -----------------------------------------------

// Show answer response deadline warning, and update the warning counter
var answer_n_respond = [kick_out, {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size: 150%">Please press continue after reading the answer</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: tooSlowTime,
  on_finish: function() {
    var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
    jsPsych.data.addProperties({
      n_warnings: up_to_now + 1
    });
  },
  data: {
    category: 'ansewr-no-respond'
  },
  post_trial_gap: postTooSlowTime
}];

// Present the answer to the question
var wait_trial_answer = [{
    // Wait time
    type: 'html-keyboard-response',
    stimulus: '<div id="fixation">...</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: function() {
      return jsPsych.timelineVariable('wait_time', true) * 1000
    },
    data: {
      category: 'wait_wait',
      questionId: jsPsych.timelineVariable('questionId'),
      wait_duration: jsPsych.timelineVariable('wait_time'),
      type: jsPsych.timelineVariable('type'),
      block: jsPsych.timelineVariable('block')
    }
  },
  {
    // Answer
    type: 'html-button-response',
    stimulus: jsPsych.timelineVariable('answer'),
    choices: ["Continue"],
    margin_vertical: "80px",
    trial_duration: maxAnswerTime,
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
    timeline: answer_n_respond,
    conditional_function: function() {
      // Got to answer only if wait selected
      var resp = jsPsych.data.get().filter({
        category: "wait_answer"
      }).last(1).select("button_pressed").values[0]

      return resp == null ? true : false
    }
  },
  {
    // Satisfaction rating
    type: "html-button-response",
    stimulus: "Was the answer worth the wait?",
    choices: ["1", "2", "3", "4", "5"],
    post_trial_gap: jsPsych.timelineVariable('ITI_next'),
    trial_duration: satisfactionMaxTime,
    prompt: "<div id='satsifaction_prompt'><i>1</i> = Not at all, <i>5</i> = Extremely worth it</div>",
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
      var resp = jsPsych.data.get().filter({
        category: "wait_satisfaction"
      }).last(1).select("button_pressed").values[0]

      return resp == null ? true : false
    }
  }
];

// Full WTW task trial
var wait_trial = [fullscreen_prompt, {
    // Fixation
    type: 'html-keyboard-response',
    stimulus: '<div id="fixation">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: fixationTime,
    data: {
      category: 'wait_fixation',
      questionId: jsPsych.timelineVariable('questionId'),
      wait_duration: jsPsych.timelineVariable('wait_time'),
      type: jsPsych.timelineVariable('type'),
      block: jsPsych.timelineVariable('block')
    },
  }, {
    // Question
    type: 'html-button-response-min-time',
    stimulus: jsPsych.timelineVariable('question'),
    choices: function() {
      return [
        'SKIP',
        "WAIT " + jsPsych.timelineVariable('wait_time', true),
        "KNOW"
      ]
    },
    margin_horizontal: "40px",
    margin_vertical: "80px",
    trial_duration: maxStimDuration,
    min_response_time: minResponseTime,
    on_load: function(){ // Disable the buttons for the minimal response time so that it's clear
      $('button').prop('disabled', true);
      setTimeout(function(){$('button').prop('disabled', false);}, minResponseTime)
    },
    data: {
      category: 'wait_question',
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
      var resp = jsPsych.data.get().filter({
        category: "wait_question"
      }).last(1).select("button_pressed").values[0]

      return resp == null ? true : false
    }
  },
  {
    timeline: wait_trial_answer,
    conditional_function: function() {
      // Got to answer only if wait selected
      var resp = jsPsych.data.get().filter({
        category: "wait_question"
      }).last(1).select("button_pressed").values[0]

      return resp == "1" ? true : false
    }
  },
  {
    timeline: [{
      type: "html-keyboard-response",
      stimulus: "",
      choices: jsPsych.NO_KEYS,
      trial_duration: jsPsych.timelineVariable('ITI_next'),
      data: {
        category: "wait_skip_ITI",
        ITI_next: jsPsych.timelineVariable('ITI_next')
      }
    }],
    conditional_function: function() {
      // If skipped or know - add ITI here
      var resp = jsPsych.data.get().filter({
        category: "wait_question"
      }).last(1).select("button_pressed").values[0]

      return resp == "1" ? false : true
    }
  }
];

// Full timeline for WTW task. This is what you use in your main js file
var wait_timeline = [{
  timeline: wait_trial,
  conditional_function: function() {
    data = jsPsych.data.get().last(1).values()[0];
    if (Date.now() < data.wait_start_time + maxTaskTime * 60 * 1000) {
      return true
    }
    return false
  }
}];

// Instructions for the waiting task ---------------------------

var pre_waiting_qs = jsPsych.randomization.shuffle([{
          prompt: "Animals",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interested"],
          required: true,
          name: "pre_animals"
        },
        {
          prompt: "Geography",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interested"],
          required: true,
          name: "pre_geography"
        },
        {
          prompt: "The arts",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interested"],
          required: true,
          name: "pre_art"
        },
        {
          prompt: "Food",
          labels: ["1<br>Not at all", "2", "3", "4", "5<br>Very interested"],
          required: true,
          name: "pre_food"
        }]);

var wait_instructions1 = [{
    timeline: [
      {
        type: "survey-likert",
        preamble: '<div id="instruct"><p>Before we proceed, please rate how interested you are to learn new information in each of the following topics:</p></div>',
        timeline: [
          {questions: pre_waiting_qs.splice(0,2)},
          {questions: pre_waiting_qs}
        ],
        randomize_question_order: true,
        scale_width: 500,
        data: {
          category: "pre_task_preferences"
        }
      },{
        type: 'instructions',
        pages: ['<div id="instruct"><p>You will now do a computer task about curiosity. Press the <i>Next</i> button to read the instructions for this task.</p></div>',
          '<div id="instruct"><p>In this task, you will be shown a series of trivia questions about animals, the arts, food or geography.</p></div>',
        ],
        show_clickable_nav: true,
        allow_keys: false,
        data: {
          category: "wait_instructions1"
        }
      },
      {
        type: 'instructions',
        pages: [
          '<div id="instruct"><p>For each question, you must decide if you want to know the answer to the question.<br></p><p>If you want to find out the answer, you will have to wait a certain amount of time.</p><p>If you do not want to wait to see the answer, you can choose to skip the question.</p><p>If you are 100% certain that you already know the answer to the question, you may indicate that you already know it.</p><p>If you choose to skip or indicate that you know the answer, you will NOT see the answer to the question.</p></div>',
          '<div id="instruct"><p>When you are first shown the trivia question, the screen will look like this:<p>\
  <center><img width="50%" src="../static/images/wait_instructions.jpg" border="1"></center>\
  <p>You will use your mouse to click one of the buttons to indicate whether you would like to skip the question, wait for the answer, or that you know its answer.</p>\
  <p>The number next to the word "Wait" tells you how much time in seconds will pass before the answer is revealed.</p></div>',
          '<div id="instruct"><p>If you choose to wait for a question, you will be asked to rate if the answer was worth waiting for on a scale of 1 = not worth it up to 5 = extremely worth it.</p></div>',
          '<div id="instruct"><p>The task will continue for ' + maxTaskTime + ' minutes. The task takes the same amount of time regardless of how many questions you choose to skip or wait for, so please base your decisions on how interested you are in learning the answers.</p></div>',
          '<div id="instruct"><p>You will soon do a short practice version to get comfortable with the task. Please use this time to get used to pressing the different buttons and to the amount of time you have to respond to the different prompts.<p></div>',
          '<div id="instruct"><p>You will first be asked to answer some questions to ensure that you understood the instructions.</p>\
  <p>Please answer to the best of your ability.</p>\
  <p>If you miss a question, you will be sent back to review the instructions and re-take the test. You must get all questions correct before you can move on to the practice round of the task.</p></div>'
        ],
        show_clickable_nav: true,
        allow_keys: false,
        data: {
          category: "wait_instructions1"
        }
      },
      {
        type: 'survey-multi-choice',
        data: {
          category: "wait_instructions_quiz"
        },
        questions: [{
            prompt: 'If I choose "SKIP" or "KNOW," I will not see the answer to the trivia question.',
            options: ['True', 'False'],
            required: true,
            horizontal: true
          },
          {
            prompt: 'The trivia task will take ' + maxTaskTime +
              ' minutes, regardless of whether I press SKIP, KNOW, or WAIT.',
            options: ['True', 'False'],
            required: true,
            horizontal: true
          },
          {
            prompt: 'I should press KNOW only if I\'m 100% sure I know the answer to the question.',
            options: ['True', 'False'],
            required: true,
            horizontal: true
          },
          {
            prompt: 'There are four categories of questions: Animal, Art, Food, and Geography',
            options: ['True', 'False'],
            required: true,
            horizontal: true
          }
        ],
        randomize_question_order: true,
        preamble: 'Please answer these questions:'
      }
    ],
    loop_function: function() {
      var resps = JSON.parse(jsPsych.data.get().last(1).select("responses").values[0]);
      for (i = 0; i < 3; i++) {
        if (resps["Q" + i] == "False") {
          return true
        }
      }
      return false
    }
  },
  {
    type: "html-button-response",
    stimulus: "<div id='instruct'><p>You are ready for a short practice. Please use this time to get used to pressing the different buttons and to the amount of time you have to respond to the different prompts.</p>\
    <p>Press <i>Continue</i> to start the short training block.</p></div>",
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'wait_instructions1'
    },
    post_trial_gap: 200,
    on_finish: function() {
      jsPsych.data.addProperties({
        wait_start_time: Date.now()
      });
    }
  },
];

var wait_instructions_post_practice = {
  type: "instructions",
  pages: ['<div id="instruct"><p>You will now begin the full version of the \
  task. The task will continue for ' + maxTaskTime + ' minutes.</p>\
  </div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions_post_practice"
  },
  on_finish: function() {
    jsPsych.data.addProperties({
      wait_start_time: Date.now()
    });
  }
}

var wait_instructions2 = {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You will now continue to another round of the same task with different questions.</p></div>',
    '<div id="instruct"><p>This block is also ' + maxTaskTime +
    ' minutes long, regardless of how many questions you choose to skip or wait \
    for, so please base your decisions on how interested you are in learning \
    the answers.</p></div>',
    '<div id="instruct"><p>Press the <i>Next</i> button to begin the next round of the task.</p></div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions1"
  },
  on_finish: function() {
    jsPsych.data.addProperties({
      wait_start_time: Date.now()
    });
  }
};

var wait_instructions_post_task = {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You finished the first task in this study.</p>\
    <p>Press next to continue to the next task.</p></div>'],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions_post"
  }
};


// A function that assigns waiting tines and ITIs to a list of trials
function drawTimes(items) {
  var wait_times = jsPsych.randomization.repeat(waits,
    Math.ceil(items.length / waits.length), false);

  for (i = 0; i < items.length; i++) {
    items[i]["wait_time"] = wait_times[i];
    items[i]["ITI_next"] = Math.random() * (ITI_range[1] - ITI_range[0]) +
      ITI_range[0]
  }
  return items
}

// A function that shuffles a list of trials of two types, 
// making sure you don't have a long sequence only of one type
function pseudoShuffle(items, types, bin_size = 6) {

  // Separate by type of question
  var cond0 = items.filter(item => item["type"] == types[0]),
    cond1 = items.filter(item => item["type"] == types[1]);

  // Random order each type
  cond0 = jsPsych.randomization.shuffle(cond0);
  cond1 = jsPsych.randomization.shuffle(cond1);

  var shuf_items = [];

  for (i = 0; i < Math.ceil(cond0.length / (bin_size / 2)); i++) {
    var this_add = cond0.slice(i * (bin_size / 2), i * (bin_size / 2) + (bin_size / 2)).concat(
      cond1.slice(i * (bin_size / 2), i * (bin_size / 2) + (bin_size / 2))
    );
    this_add = jsPsych.randomization.shuffle(this_add);

    shuf_items = shuf_items.concat(this_add);
  }
  return shuf_items
}
