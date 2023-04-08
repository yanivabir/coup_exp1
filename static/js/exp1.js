// Parameters
var sess = 1, // Session number
  version = 1.0, // Code version number
  n_for_ratings = 7; // How many items to save for rating measurement
var images = ["../static/images/wait_instructions.jpg"]; // Images to preload

// Get participant id form url
var PID = jsPsych.data.getURLVariable('workerId'),
  firstBlock = Math.random() > 0.5 ? "coup" : "general";

// Is this a debug run?
var debug = PID.includes("debug");

// Keep important variables in global scope for convenience while debugging
var coup_items,
  general_items,
  coup_items_curiosity,
  coup_items_rating,
  general_items_curiosity,
  general_items_rating;

// Load questions from local csv file
// Changed coup to coup and general to general; removed third block.
Papa.parse("../static/coup_questions.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    coup_items = results.data;
    Papa.parse("../static/general_questions.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        general_items = results.data;
            postLoad();
          }
        });
      }
    });

var experiment = [];

// Loading csvs takes time. That's why we wrap everything else in a function that only
// runs after the csvs load
function postLoad() {

    // Separate 2 items for practice block - one from each type
    if (firstBlock == "coup") {
      // Pick 1 from each type at random
      practice_items = jsPsych.randomization.shuffle(
        coup_items).filter(x => x['type'] == "useful").splice(0,1).concat(
          jsPsych.randomization.shuffle(coup_items).filter(x =>
          x['type'] == "not useful").splice(0,1));
      // Remove them from coup list
      coup_items = coup_items.filter(x => !practice_items.includes(x));
    } else {
      // Pick 1 from each type at random
      practice_items = jsPsych.randomization.shuffle(
        general_items).filter(x => x['type'] ==
        "useful").splice(0,1).concat(jsPsych.randomization.shuffle(general_items).filter(x =>
          x['type'] == "not useful").splice(0,1));
      // Remove them from general list
      general_items = general_items.filter(x => !practice_items.includes(x));
    }
  
    // Split items to curiosity and rating  sets
    coup_items = pseudoShuffle(coup_items, ["useful", "not useful"], 6);
    general_items = pseudoShuffle(general_items, ["useful", "not useful"], 6);
  
    coup_items_curiosity = coup_items.slice(0,
      coup_items.length - n_for_ratings);
    coup_items_rating = coup_items.slice(
      coup_items.length - n_for_ratings, coup_items.length);
  
    general_items_curiosity = general_items.slice(0,
      general_items.length - n_for_ratings);
    general_items_rating = general_items.slice(
      general_items.length - n_for_ratings, general_items.length);

  // Set timing parameters for waiting task practice block
  practice_items = drawTimes (practice_items)

  // Draw timing parameters for waiting task
  coup_items_curiosity = drawTimes(coup_items_curiosity);
  general_items_curiosity = drawTimes(general_items_curiosity);


  // Set up the first trial, the transitions to fullscreen.
  // This trial also saves the PID to the data, and sets the counterbalanced
  // order of blocks.
  var fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<p>אתר המחקר פועל רק במצב מסך מלא. בכדי לעבור למסך מלא, ולהתחיל את המחקר, לחצו על הכפתור מטה</p>',
    button_label: 'המשך',
    on_finish: function() {
      // Hide mouse
      var stylesheet = document.styleSheets[0];
      // stylesheet.insertRule("* {cursor: none;}", stylesheet.cssRules.length);
      jsPsych.data.addProperties({
        n_warnings: 0,
        PID: PID,
        firstBlock: firstBlock,
        sess: sess,
        version: version
      });
    }
  }

  // Welcome message
  var welcome = {
    type: "html-button-response",
    stimulus: "<div id='instruct'><p>כחלק מהמחקר, תתבקשו להשלים כמה משימות, ולמלא כמה שאלונים. בכל שלבי המחקר אנו רוצים לשמוע על הדעות והידע האישיים שלכם.</p>\
      <p>חשוב לנו שתקדישו את כל תשומת הלב למשימות בזמן השתתפותכם. אנו בודקים את תגובותיכם לוודא שהקדשתם תשומת לב, ושלא השתמשתם באפליקציות אחרות בזמן המחקר. מי שיקידש את תשומת לבו המלאה, יקבל בונוס של ₪10 בנוסף לתשלום על ההשתתפות.<p>\
      תודה על השתתפותך במחקר!</p></div>",
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
    category: 'welcome'
    },
    post_trial_gap: 200
  }

  // Build waiting task blocks
  wait_practice_block = {
    timeline: wait_timeline,
    timeline_variables: practice_items
  }

  wait_block1 = {
    timeline: wait_timeline,
    timeline_variables: firstBlock == "coup" ? coup_items_curiosity : general_items_curiosity
  }

  wait_block2 = {
    timeline: wait_timeline,
    timeline_variables: firstBlock == "coup" ? general_items_curiosity : coup_items_curiosity
  }

  // Shuffle probe order across coup trial
  for (i = 0; i < coup_items_rating.length; i++) {
    var this_trial = []
  }

  // coup rating block variable
  var coup_rating_block = {
    timeline: rating_trial,
    timeline_variables: coup_items_rating,
    randomize_order: true
  }

  // Shuffle probe order across general trial
  for (i = 0; i < general_items_rating.length; i++) {
    var this_trial = []
  }

  // general rating block variable
  var general_rating_block = {
    timeline: rating_trial,
    timeline_variables: general_items_rating,
    randomize_order: true
  }

  // Message that shows up before the questionnaire section
  var pre_questionnaires_message = {
    type: "html-button-response",
    stimulus: '<div id="instruct"><p>For the last part of the study, we ask \
      you to answer a few questions about yourself, including your opinions, feelings, and beliefs.</p> \
      <p>Please answer these questions as truthfully and accurately \
      as possible.</p></div>',
      choices: ["Continue"],
      margin_vertical: "80px",
      data: {
        category: 'pre_questionnaires_message'
      },
      post_trial_gap: 200
  }

   // Message that shows up before the questionnaire section
   var anxiety_message = {
    type: "html-button-response",
    stimulus: "<div id='instruct'>A number of statements which people have used to \
    describe themselves will follow. Read each statement and choose the number \
    that indicates how you feel <b>right now‚ at this moment</b>.</p><p>There \
    are no right or wrong answers. Do not spend too much time on any one statement \
    but give the answer which seems to best describe your present feelings.</div>",
      choices: ["Continue"],
      margin_vertical: "80px",
      data: {
        category: 'anxiety_message'
      },
      post_trial_gap: 200
  }

// Message that shows up before impulsiveness questionnaire
var impulse_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>People differ in the ways they act and think in different situations.</p> \
  Please read each of the following statements carefully and use the scale below them to indicate \
  the option that best describes how often you act or behave that way.</p> \
  <p>Please answer these questions as truthfully and accurately as possible.</p></div>',
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'impulse_message'
    },
    post_trial_gap: 200
}

// Message that shows up before regulatory focus questionnaire
var regfocus_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>You will now continue answering questions about yourself.</p> \
  Please read each of the following statements, then use the scale below them to indicate how much \
  you agree with each statement according to your beliefs and experiences.</p> \
  <p>There are no right or wrong answers.</p></div>',
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'regfocus_message'
    },
    post_trial_gap: 200
}

// Message that shows up before apathy questionnaire
var apathy_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>You will now continue answering questions about yourself.</p> \
  Please read each of the following questions and provide an answer to each one by selecting the item\
  on the scale that best describes you.</p> \
  <p>There are no right or wrong answers.</p></div>',
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'apathy_message'
    },
    post_trial_gap: 200
}

// Message that shows up before pleasure questionnaire
var pleasure_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>You will now continue answering questions about yourself.</p> \
  You will read statements people often use to describe themselves. Please use the scale below each statement\
  to indicate the degree to which these statements accurately describe you.</p> \
  <p>There are no right or wrong answers.</p></div>',
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'pleasure_message'
    },
    post_trial_gap: 200
}

// Message that shows up before depression questionnaire
var depression_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>You will now continue answering questions about yourself.</p> \
  <p>For this last set of questions, we ask you to think about how you felt <b>over the last 2 weeks.</b></p>\
  Please read each statement and choose the one that best describes how you have been feeling <b>the past two weeks, \
  including today</b>.<p>If several statements apply equally well, choose the highest number for that group.</p></div>',
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'depression_message'
    },
    post_trial_gap: 200
}

   // Message that shows up before demographic section
   var demog_message = {
    type: "html-button-response",
    stimulus: '<div id="instruct"><p>You will now answer a few questions \
      about your demographic information.</p></div>',
      choices: ["Continue"],
      margin_vertical: "80px",
      data: {
        category: 'demog_message'
      },
      post_trial_gap: 200
  }

  // Debriefing and data upload
  var debrief = [{
      type: "instructions",
      pages: ['<div id="instruct">Thank you for participating in this study!<p>\
      In this study we were interested in people\'s curiosity about different \
      types of questions.</p>\
      <p>We will process the data within 48h and grant an extra $2 to any \
      participant that stayed engaged throughout the task.</p></div>'],
      show_clickable_nav: true,
      allow_keys: false,
      data: {
        category: "debrief"
      }
    },
    {
      type: 'fullscreen',
      fullscreen_mode: false
    },
    {
      type: "instructions",
      pages: ["<div id ='instruct'><p>Once you press the <i>Next</i> \
    button, your results will be uploaded to the server, and the study will\
    complete. <b>This may take several minutes - do not \
    refresh or close your browser during this time.</b></p>\
    <p>After your results are uploaded to the server, you will be presented \
    with the completion code for MTurk.\
    <p>Press the <i>Next</i> button to upload your results.</p></div>"],
      show_clickable_nav: true,
      allow_keys: false,
      data: {
        category: "debrief"
      }
    },
    {
      type: "html-keyboard-response",
      data: {
        category: "save_data"
      },
      stimulus: "<div id='instruct'><p>Data uploading. To ensure proper completion \
      of the study, please don't refresh, \
      close your browser or open another tab.\
      </p></div>",
      choices: jsPsych.NO_KEYS,
      on_load: function() {
        var d = new Date;
        saveData(PID, sess, '', jsPsych.data.get().csv(),
          function() {
            saveData(PID, sess, '_int', jsPsych.data.getInteractionData().csv(),
          jsPsych.finishTrial);
          });
      }
    },
    {
      type: "html-keyboard-response",
      data: {
        category: "data_saved"
      },
      stimulus: "<div class='instructions'><p>Your results have successfully uploaded.</p>\
    <p>Your completion code for this study is: <br> <b>EK75HN8</b></p>\
    <p>Use it to submit this HIT on MTurk.</p>\
    <p>You may now close this window.</p></div>",
      choices: jsPsych.NO_KEYS
    }
  ];


  // Put it all together
  experiment.push(fullscreen);
  experiment.push(welcome);
  experiment = experiment.concat(wait_instructions1);
  experiment.push(wait_practice_block);
  experiment.push(wait_instructions_post_practice);
  experiment.push(wait_block1);
  experiment.push(wait_instructions2);
  experiment.push(wait_block2);
  experiment.push(wait_instructions_post_task);
  experiment.push(rating_instructions);
  if (firstBlock == "coup"){
    experiment.push(coup_rating_block);
    experiment.push(general_rating_block);  
  }else{
    experiment.push(general_rating_block);  
    experiment.push(coup_rating_block);
  }
  experiment.push(pre_questionnaires_message);
//   experiment.push(anxiety_message);
//   experiment = experiment.concat(anxiety);
//   experiment.push(impulse_message);
//   experiment = experiment.concat(impulsive);
//   experiment.push(regfocus_message);
//   experiment = experiment.concat(reg_focus);
//   experiment.push(apathy_message);
//   experiment = experiment.concat(apathy);
//   experiment.push(pleasure_message);
//   experiment = experiment.concat(pleasure);
  experiment.push(demog_message);
  experiment = experiment.concat(demographic_block);
  experiment = experiment.concat(debrief);

  // Prevent right clicking and refreshing the page
  if (!debug) {
    // Prevent right-click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Prompt before refresh
    window.addEventListener('beforeunload', function(e) {
      // Cancel the event
      e.preventDefault();
      e.returnValue = '';
    });

  }

  // Initiate experiment
  jsPsych.init({
    timeline: experiment,
    preload_images: images
  });

}