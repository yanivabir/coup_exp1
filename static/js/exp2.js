// Parameters
var sess = 2,
  version = 1.0
var images = [];

// ------- Determine subject level variables ----- //
var PID = jsPsych.data.getURLVariable('workerId');

// Is this a debug run?
var debug = PID.includes("debug");

// Keep important variables in global scope for convenience
var viewed_answers,
  firstBlock;

// Load items from local csv file
Papa.parse("../static/secSessStims/" + PID + "_viewedAnswers.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    viewed_answers = results.data;
    firstBlock = viewed_answers[0]["firstBlock"];
    postLoad();
  },
  error: function() {
    document.body.innerHTML = "<div id='instruct'><p>אנו מצטערים, חלה שגיאה בזיהוי שלך.</p>\
      <p>אנא צרו קשר עם ya2402+midgam@columbia.edu כדי לפתור את הבעיה.</p>\
      <p>תודה רבה!</p></div>"
  }
});

var experiment = [];


// Execute all of this experiment prep and run after we load items from local
// csv file
function postLoad() {

  // Fullscreen experiment, save PID, counterbalancing
  var fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<p>This study runs in fullscreen. To switch to full screen mode \
      and start the experiment, press the button below.</p>',
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

  var welcome = {
    type: "instructions",
    pages: [
      "<div id='instruct'><p>Welcom back to this study!</p>\
      <p>On week ago, you completed several tasks related to your curiosity \
      towards different questions, and your judgments and perceptions of various \
      topics.</p>\
      <p>Today, we are interested in your memory of the previous session. \
      Throughout the first part of this session, you will be asked to recall \
      the reading material and your answers from last week.</p></div>",
      "<div id='instruct'><p>When prompted, please try your best to remember \
      the relevant piece of information from last week.</p><p>We will be going over \
      responses, and awarding a $1 bonus payment only to participants who made a sincere \
      effort at remembering.</p><p>This bonus will be processed within 48 hours from \
      completing this session.</p></div>"
    ],
    show_clickable_nav: true,
    allow_keys: false,
    data: {
      category: 'welcome'
    },
    post_trial_gap: 200
  };

  // Shuffle questions for recall
  viewed_answers = shuffle_viewed_answers(viewed_answers);

  // Answer recall block
  var answer_recall_block = {
    timeline: recall_trial,
    timeline_variables: viewed_answers
  }

  var pre_recall_corona_message = {
    type: "instructions",
    pages: [
      "<div id='instruct'><p>This is the end of this part of this session.</p></div>",
      "<div id='instruct'><p>In the next part of the experiment, we will ask you \
      to revisit the answers you gave<br><font color='tomato'><b>one week ago</b></font> \
      regarding your opinions and beliefs.</p><p>You will now review some questions\
      that you answered last week. Please answer them <i>as close as possible to \
      your answers last week</i>.</p></div>",
      "<div id='instruct'><p>Press the <i>Next</i> button to start recalling your \
      answers <font color='tomato'><b>from last week</b></font>.</p>"
    ],
    show_clickable_nav: true,
    allow_keys: false,
    data: {
      category: 'pre_recall_corona_message'
    },
    post_trial_gap: 200
  };

  var pre_questionnaires_message = {
    type: "instructions",
    pages: [
      '<div id="instruct"><p>For the last part of the experiment, we ask \
      you to answer a few questions about your opinions, feelings and beliefs <font color="Chartreuse"><b>right now</b></font>.</p>\
      </div>',
      '<div id="instruct"><p>You are no longer trying to recall previous answers, but \
        just reporting your feelings <font color="Chartreuse"><b>right now</b></font>.\
        <p>Please answer these questions as truthfully and accurately \
      as possible</p></div>'
    ],
    show_clickable_nav: true,
    allow_keys: false,
    data: {
      category: 'pre_questionnaires_message'
    },
    post_trial_gap: 200
  }

  // Debriefing and data upload
  var debrief = [{
      type: "instructions",
      pages: ['<div id="instruct">Thank you for participating in this experiment!<p>\
      In this study we were interested in people\'s curiosity about different \
      types of questions.</p>\
      <p>Any health information presented in this experiment was based on the \
      researchers’ reading of current publicly available information from the \
      Center for Disease Control and other reputable health and news media \
      websites but should not be taken as medical advice. If you have any \
      questions about your health, you should seek the judgment of a medical \
      professional.</p>\
      <p>We will process your data within 48h and grant you an extra $1 to any \
      participant that made an honest attempt at recalling previous answers.</p></div>'],
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
    button, your results will be uploaded to the server, and the experiment will\
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
      of the experiment, please don't refresh, \
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
    <p>Your completion code for this study is: <br> <b>JK834LL3</b></p>\
    <p>Use it to submit this HIT on MTurk.</p>\
    <p>You may now close this window.</p></div>",
      choices: jsPsych.NO_KEYS
    }
  ];


  // Put it all together
  experiment.push(fullscreen);
  experiment.push(welcome);
  experiment.push(recall_instructions1);
  experiment = experiment.concat(answer_recall_block);
  experiment.push(pre_recall_corona_message);
  experiment = experiment.concat(recall_corona_block);
  experiment.push(pre_questionnaires_message);
  experiment = experiment.concat(gallup_block);
  experiment = experiment.concat(anxiety);
  experiment = experiment.concat(corona_perception_block);
  experiment = experiment.concat(demographic_block);
  experiment = experiment.concat(debrief);

  // Prevent right click, refresh
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
