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
var maxStimDuration = 15000, // Response deadline for questions
  minResponseTime = 1500, // Minimum response time for questions
  satisfactionMaxTime = 5000, // Maximum response time for satisfaction rating
  tooSlowTime = 1000, // Duration of warning message
  maxAnswerTime = 90000, // Response deadline for answers
  postTooSlowTime = 800, // ITI post warning message
  fixationTime = 500, // Duration of fixation period b/w trials
  maxTaskTime = 7.5, // Total duration of block
  waits = [3, 4, 5, 6, 7, 8, 9], // Wait times in task
  ITI_range = [500, 1200]; // Range of ITIs in task. Drawn from a uniform distribution on this range.

// WTW Trials -----------------------------------------------

// Show question response deadline warning, and update the warning counter
var too_slow = [kick_out, {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size: 150%; direction: rtl">אנא בחרו מהר יותר</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: tooSlowTime,
  on_finish: function() {
    var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
    jsPsych.data.addProperties({
      n_warnings: up_to_now + 1
    });
  },
  data: {
    category: 'too-slow'
  },
  post_trial_gap: postTooSlowTime
}];

// Show answer response deadline warning, and update the warning counter
var answer_n_respond = [kick_out, {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size: 150%; direction: rtl">אנא לחצו המשך אחרי שקראתם את התשובה</div>',
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
    stimulus: function() {
      return "<div class='answer'>" + jsPsych.timelineVariable('answer', true) + "</div>"
    },
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
    //Add a new rating questions: 50% "Was the answer worth the wait?"; 50% "Would you be curious to learn more about this topic?".
    type: "html-button-response",
    stimulus: jsPsych.timelineVariable('postanswer_stimulus'),
    choices: ["1", "2", "3", "4", "5"],
    post_trial_gap: jsPsych.timelineVariable('ITI_next'),
    trial_duration: satisfactionMaxTime,
    prompt: function() {
      return "<div id='satsifaction_prompt'><i>1</i> = Not at all, <i>5</i> = Extremely " +
        (jsPsych.timelineVariable('postanswer_item', true) == 'satisfaction' ? "worth it" : "curious") + "</div>"
    },
    margin_horizontal: "30px",
    margin_vertical: "80px",
    data: {
      category: jsPsych.timelineVariable('postanswer_item'),
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
    stimulus: function() {
      return "<div class='question'>" + jsPsych.timelineVariable('question', true) + "</div>"
    },
    choices: function() {
      return [
        'ידוע',
        "לחכות " + jsPsych.timelineVariable('wait_time', true),
        "לדלג"
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
var check_quiz_function = function() {
  var resps = JSON.parse(jsPsych.data.get().filter({category: "wait_instructions_quiz"}).last(1).select("responses").values[0]);
  console.log(resps)
  for (i = 0; i < 3; i++) {
    if (resps["Q" + i] == "False") {
      return true
    }
  }
  return false
}

var wait_instructions1_text_list = ['<div id="instruct"><p>נתחיל במשימה העוסקת בסקרנות. לחצו על הכפתור בכדי לקרוא את ההוראות למשימה.</p></div>',
  '<div id="instruct"><p>במשימה זו, תוצג בפניכם בכל פעם שאלה אחת.<br></p><p>אם ברצונכם לקרוא את התשובה לשאלה, תצטרכו להמתין מספר שניות.</p><p>אם אינכם רוצים להמתין, תוכלו לדלג על השאלה.</p><p>אם אתם בטוחים ב100% שאתם יודעים את התשובה, תוכלו לסמן שהתשובה ידועה.</p><p>אם תבחרו לדלג, או שתסמנו שהתשובה ידועה, <b>לא תוכלו</b> לקרוא את התשובה.</p></div>',
  '<div id="instruct"><p>כל שאלה תוצג על המסך באופן הזה:<p>\
    <center><div style="border:1px solid black; width: 500px; height: 200px">\
    <div id="jspsych-html-button-response-stimulus" style="padding-top: 5%">מה היה החיסון היעיל הראשון שפותח?</div>\
    <div id="jspsych-html-button-response-btngroup">\
    <div class="jspsych-html-button-response-button" style="display: inline-block; margin: 80px 8px"><button class="jspsych-btn">לדלג</button></div>\
    <div class="jspsych-html-button-response-button" style="display: inline-block; margin: 80px 8px"><button class="jspsych-btn">להמתין 4</button></div>\
    <div class="jspsych-html-button-response-button" style="display: inline-block; margin: 80px 8px"><button class="jspsych-btn">ידוע</button></div></div></div></center>\
    <p>תצטרכו לבחור בעזרת העכבר אם לדלג על התשובה, להמתין לה, או שהיא כבר ידועה לכם.</p></div>',
    '<div id="instruct"><p>אם תבחרו להמתין לתשובה תתבקשו לדרג עד כמה התשובה הייתה שווה את ההמתנה. <br> .תדרגו זאת על סולם של 1 = לא שווה כלל, עד 5 = שווה מאוד</p></div>',
    '<div id="instruct"><p>המשימה תארך ' + maxTaskTime + ' דקות. אורך המשימה יהיה זהה, לא משנה על כמה פעמים תבחרו להמתין לתשובה או לדלג לשאלה הבאה. לכן, בחרו אם להמתין או לדלג לפי העניין האישי שלכם.</p></div>',
    '<div id="instruct"><p>בקרוב תתחילו באימון קצר. נצלו את האימון בכדי להתרגל ללחיצה על הכפתורים השונים, ולקצב בו יוצגו השאלות ותצטרכו להגיב להן.<p></div>',
    '<div id="instruct"><p>קודם לכן, נשאל אתכם כמה שאלות בכדי לוודא שהבנתם את ההוראות.</p>\
    <p>ענו על השאלות כמיטב יכולתכם.</p>\
    <p>אם תענו תשובה שגויה, ההוראות יוצגו שוב, ותיבחנו שנית על הבנתן. כדי להמשיך לאימון, חובה לענות על כל השאלות נכונה.</p></div>'    
  ]

var wait_instructions1_text = []

for (i=0; i < wait_instructions1_text_list.length; i++){
  wait_instructions1_text.push({text: wait_instructions1_text_list[i]})
}

var wait_instructions1 = [{
    timeline: [
      {timeline: [{
        type: 'html-button-response',
        choices: ['המשך'],
        stimulus: jsPsych.timelineVariable('text'),
        data: {
          category: "wait_instructions1"
        }
      }],
      timeline_variables: wait_instructions1_text
    },
      {
        type: 'survey-multi-choice',
        data: {
          category: "wait_instructions_quiz"
        },
        questions: [{
            prompt: 'אם אבחר לדלג או שאסמן שהתשובה ידועה, לא אראה את התשובה לשאלה',
            options: ['אמת', 'שקר'],
            required: true,
            horizontal: true
          },
          {
            prompt: 'המשימה תארך ' + maxTaskTime +
              ' דקות, בלי קשר למספר הפעים שאבחר לדלג, להמתין או שאסמן שהתשובה ידועה.',
            options: ['אמת', 'שקר'],
            required: true,
            horizontal: true
          },
          {
            prompt: 'עלי ללחוץ ״ידוע״ רק אם התשובה ידועה לי ב-100% ודאות.',
            options: ['אמת', 'שקר'],
            required: true,
            horizontal: true
          }
        ],
        randomize_question_order: true,
        preamble: 'בבקשה ענו על השאלות הבאות:'
      },
      {
        timeline: [{
          type: "html-button-response",
          stimulus: "<div id='instruct'>You did not answer all of the quiz questions correctly. Press <i>Continue</i> to review the instructions and retake the quiz.</div>",
          choices: ["Continue"],
          margin_vertical: "80px",
          data: {
            category: 'wait_instructions_quiz_failure'
          },
          post_trial_gap: 200
        }],
        conditional_function: check_quiz_function
      }, ],
    loop_function: check_quiz_function
  },
  {
    type: "html-button-response",
    stimulus: "<div id='instruct'>Press <i>Continue</i> to start the short training block.</div>",
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

// Wait instructions after the practice blocks
var wait_instructions_post_practice_reddit = {
  type: "instructions",
  pages: ['<div id="instruct"><p>You will now begin the full version of the task, where you will be presented with general questions people asked online. \
  You must decide if you want to see the answer to the question.<br></p><p>The task will continue for ' + maxTaskTime + ' minutes.</p>\
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

var wait_instructions_post_practice_NYT = {
  type: "instructions",
  pages: ['<div id="instruct"><p>You will now begin the full version of the task, where you will be presented with newspaper headlines that contain a question. \
  You must decide if you want to see the first paragraph of the article.<br></p><p>The task will continue for ' + maxTaskTime + ' minutes.</p>\
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

// Wait instructions before the Reddit task (2nd Block)
var wait_instructions_reddit2= {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You finished the first task in this study.</p>\
  <p>Press next to continue to the next task.</p></div>',
  '<div id="instruct"><p>In the next task, you will be reading a different type of questions. You will see general questions people asked online. You must decide if you want to see the answer to the question.<br></p><p>If you want to read the answer, you will have to wait a certain amount of time.</p><p>If you do not want to wait, you can choose to skip the question.</p><p>If you are 100% certain that you already know the answer to the question, you may indicate that you already know it.</p><p>If you choose to skip or indicate that you know the answer, you will NOT see the answer.</p></div>',
    '<div id="instruct"><p>This block is also ' + maxTaskTime +
    ' minutes long, regardless of how many questions you choose to skip or wait \
    for, so please base your decisions on how interested you are in learning \
    the answers.</p></div>',
    '<div id="instruct"><p>Press the <i>Next</i> button to begin the next round of the task.</p></div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions2_reddit"
  },
  on_finish: function() {
    jsPsych.data.addProperties({
      wait_start_time: Date.now()
    });
  }
};

// Wait instructions before the NYT task (2nd Block)
var wait_instructions_NYT2 = {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You finished the first task in this study.</p>\
    <p>Press next to continue to the next task.</p></div>',
    '<div id="instruct"><p>In the next task, you will be reading a different type of questions. \
    You will see newspaper headlines that present a question. You must decide if you want to see the \
    first paragraph of the newspaper article.<br></p><p>\
    If you want to read the first paragraph of the newspaper article, you will have to wait a certain amount of time.</p>\
    <p>If you do not want to wait, you can choose to skip the question.</p>\
    <p>If you are 100% certain that you already know the answer to the question presented by the newspaper headline, you may indicate that you already know it.</p>\
    <p>If you choose to skip or indicate that you know the answer, you will NOT see the first paragraph of the article.</p></div>',
    '<div id="instruct"><p>This block is also ' + maxTaskTime +
    ' minutes long, regardless of how many questions you choose to skip or wait \
    for, so please base your decisions on how interested you are in learning \
    the answers.</p></div>',
    '<div id="instruct"><p>Press the <i>Next</i> button to begin the next round of the task.</p></div>'
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions2_nytimes"
  },
  on_finish: function() {
    jsPsych.data.addProperties({
      wait_start_time: Date.now()
    });
  }
};

var wait_instructions_post_task = {
  type: 'instructions',
  pages: ['<div id="instruct"><p>You finished the second task in this study.</p>\
    <p>Press next to continue to the next task.</p></div>'],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "wait_instructions_post"
  }
}

// A function that assigns waiting tines and ITIs to a list of trials
// Added the new satisfaction_rating variable to the for loop
function drawTimes(items) {
  var wait_times = jsPsych.randomization.repeat(waits,
    Math.ceil(items.length / waits.length), false);

  for (i = 0; i < items.length; i++) {
    var postanswer = Math.random() > 0.5 ? "satisfaction":"further_curiosity"
    items[i]["postanswer_stimulus"] = postanswer == "satisfaction" ? "Was the answer worth the wait?" : "How curious are you to learn more?"
    items[i] ['postanswer_item'] = postanswer
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
