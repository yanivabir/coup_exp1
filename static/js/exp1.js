// Parameters
var sess = 1, // Session number
  version = 1.012, // Code version number
  n_for_ratings = 7; // How many items to save for covariate ratings
var images = ["../static/images/wait_instructions.jpg"]; // Images to preload

// Get participant id form url
var PID = jsPsych.data.getURLVariable('userid'),
  inviteId = jsPsych.data.getURLVariable('uid'),
  firstBlock = Math.random() > 0.5 ? "coup" : "general";

// Is this a debug run?
var debug = PID.includes("debug");

// Keep important variables in global scope for convenience while debugging
var coup_items,
  general_items,
  coup_items_waiting,
  coup_items_rating,
  general_items_waiting,
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
        Papa.parse("../static/probability_judgement.csv", {
          download: true,
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            probability_judgement_items = results.data;
            postLoad();
        }
        });
      }
    });
  }
});

var experiment = [];

function preventRefresh(e) {
  // Cancel the event
  e.preventDefault();
  e.returnValue = '';
}

// Loading csvs takes time. That's why we wrap everything else in a function that only
// runs after the csvs load
function postLoad() {

    // Separate 2 items for practice block - one from each type
    if (firstBlock == "coup") {
      // Pick 1 from each type at random
      practice_items = jsPsych.randomization.shuffle(
        coup_items).splice(0,2);
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
  
    // Split items to waiting and rating  sets
    coup_items = jsPsych.randomization.shuffle(coup_items);
    general_items = pseudoShuffle(general_items, ["useful", "not useful"], 6);
  
    coup_items_waiting = coup_items.slice(0,
      coup_items.length - n_for_ratings);
    coup_items_rating = coup_items.slice(
      coup_items.length - n_for_ratings, coup_items.length );
  
    general_items_waiting = general_items.slice(0,
      general_items.length - n_for_ratings);
    general_items_rating = general_items.slice(
      general_items.length - n_for_ratings, general_items.length);

  // Set timing parameters for waiting task practice block
  practice_items = drawTimes (practice_items)

  // Draw timing parameters for waiting task
  coup_items_waiting = drawTimes(coup_items_waiting);
  general_items_waiting = drawTimes(general_items_waiting);

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
        inviteId: inviteId,
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
      <p>חשוב לנו שתקדישו את כל תשומת הלב למשימות בזמן השתתפותכם. אנו בודקים את תגובות המשתתפים כדי לוודא שהקדשתם תשומת לב, ושלא השתמשתם באפליקציות אחרות בזמן המחקר.<p>\
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
    timeline_variables: practice_items,
    data: {
      is_practice: true
    }
  }

  wait_block1 = {
    timeline: wait_timeline,
    timeline_variables: firstBlock == "coup" ? coup_items_waiting : general_items_waiting,
    data: {
      is_practice: false
    }
  }

  wait_block2 = {
    timeline: wait_timeline,
    timeline_variables: firstBlock == "coup" ? general_items_waiting : coup_items_waiting,
    data: {
      is_practice: false
    }
  }
    

  // coup rating block variable
  var coup_rating_block = {
    timeline: rating_trial,
    timeline_variables: coup_items_rating,
    randomize_order: true
  }

  // general rating block variable
  var general_rating_block = {
    timeline: rating_trial,
    timeline_variables: general_items_rating,
    randomize_order: true
  }

  // Probablity judgument block variable
  var block_order = firstBlock == "coup" ? ["coup", "general"] : ["general", "coup"];

  probability_judgement_items = jsPsych.randomization.shuffle(probability_judgement_items.filter(x => 
    x['block'] == block_order[0])).concat(jsPsych.randomization.shuffle(probability_judgement_items.filter(x => 
      x['block'] == block_order[1])));

  var probability_judgement_block = {
    timeline: prob_judge,
    timeline_variables: probability_judgement_items
  }

  // Message that shows up before the questionnaire section
  var pre_questionnaires_message = {
    type: "html-button-response",
    stimulus: '<div id="instruct"><p>בחלק האחרון של המחקר, נבקש מכם לענות על כמה שאלות הנוגעות אליכם, דעותייך, הרגשותייך, ואמונותייך.</p> \
    <p>אנא ענה/י עליהם בדיוק וכנות האפשרית.</p></div>',
      choices: ["המשך"],
      margin_vertical: "80px",
      data: {
        category: 'pre_questionnaires_message'
      },
      post_trial_gap: 200
  }

// Message that shows up before the questionnaire section
var stai_message = {
type: "html-button-response",
stimulus: "<div id='instruct'>להלן מספר משפטים, בהם משתמשים אנשים כדי לתאר את עצמם. קרא/י כל משפט ותן/י את התשובה \
הנראית לך כמתארת בצורה הטובה ביותר את רגשותיך <b>ברגע זה</b>. \
אין כאן תשובות נכונות או לא נכונות. אל תבזבז/י יותר מדי זמן על אף אחד מהמשפטים, אלא תן/י את התשובה המדויקת ביותר, המתארת את רגשותייך כעת.\
</div>",
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
    category: 'stai_message'
    },
    post_trial_gap: 200
}

var gallup_message = {
  type: "html-button-response",
  stimulus: "<div id='instruct'><p>כעת תמשיכו לענות על שאלות על עצמכם.\
   קראו כל שאלה, ובחרו את התשובה המתאימה ביותר עבורכם.\
    אין כאן תשובות נכונות או לא נכונות.\
     אל תבזבזו יותר מדי זמן על אף אחת מהשאלות, אלא תנו את התשובה המדויקת ביותר עבוכם כרגע.</p></div>",
      choices: ["המשך"],
      margin_vertical: "80px",
      data: {
      category: 'gallup_message'
      },
      post_trial_gap: 200
  }
  

// Message that shows up before regulatory mode questionnaire
var regmode_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>כעת תמשיכו לענות על שאלות על עצמכם.</p> \
  קראו כל אחת מהאמירות הבאות. סמנו בסולם מתחת לכל אמירה עד כמה אתם מסכימים איתה, לפי האמונות והחוויות האישיות שלכם.</p> \
  <p>אין כאן תשובות נכונות או לא נכונות.</p></div>',
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
      category: 'regmode_message'
    },
    post_trial_gap: 200
}

// Message that shows up before demographic section
var demog_message = {
type: "html-button-response",
stimulus: '<div id="instruct"><p>נבקש שתענו על כמה שאלות נוספות לגבי המאפיינים הדמוגרפיים שלכם.</p></div>',
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
    category: 'demog_message'
    },
    post_trial_gap: 200
}

// Debriefing and data upload
var debrief = [{
    type: "instructions",
    pages: ['<div id="instruct">תודה על השתתפותך במפגש הראשון של המחקר!<p>\
    במחקר זה אנו בוחנים את הסקרנות של אנשים שונים לשאלות מתחומים שונים.</p>\
    <p>המידע המשפטי שהוצג במסגרת המחקר מבוסס על פרסומים בעיתונות ובערוצים ממשלתיים. המידע שהוצג אינו מהווה תחליף לייעוץ משפטי בכל מקרה.</p>\
    <p>ביום ד׳ הקרוב תקבלו מייל עם קישור המזמין אתכם להשתתף בחלק השני של המחקר. תוכלו לעשות זאת באותו היום, או למחרת. השתתפות בחלק הבא של המחקר תזכה אתכם בתשלום נוסף.</p></div>'],
    show_clickable_nav: true,
    allow_keys: false,
    data: {
      category: "debrief"
    },
    button_label_previous: "חזרה",
    button_label_next: "המשך"
},
{
    type: "instructions",
    pages: ["<div id ='instruct'><p>לחיצה על  <i>המשך</i> \
תשלח את המידע שלך לשרת, ותחזיר אותך לאתר המדגם <b>העלאת הנתונים יכולה לקחת מספר דקות. בבקשה אל תרעננו את הדפדפן או תסגרו אותו בזמן זה.</b></p>\
<p>לחצו על <i>המשך</i> לשליחת המידע.</p></div>"],
    show_clickable_nav: true,
    allow_keys: false,
    data: {
    category: "debrief"
    },
    button_label_previous: "חזרה",
    button_label_next: "המשך"
},
{
  type: 'fullscreen',
  fullscreen_mode: false
},
{
    type: "html-keyboard-response",
    data: {
    category: "save_data"
    },
    stimulus: "<div id='instruct'><p>המידע שלך נשלח ברגעים אלה. בבקשה לא לרענן את הדפדפן או לסגור את הלשונית.</p></div>",
    choices: jsPsych.NO_KEYS,
    on_load: function() {
    var d = new Date;
    saveData(PID, sess, '', jsPsych.data.get().csv(),
        function() {
          saveData(PID, sess, '_int', jsPsych.data.getInteractionData().csv(),
          function() {
            saveData(PID, 0, "_secondSessStims", createSecondSesssList(['trial_type', 'button_pressed']),
              function() {
                window.removeEventListener('beforeunload', preventRefresh);
                window.location.replace("https://www.midgampanel.com/surveyThanks2.asp?USER=" + inviteId + "&status=OK")
              }
            );
          });
        });
    }
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
  experiment.push(post_rating);
  experiment.push(probability_judgement_instructions);
  experiment.push(probability_judgement_block);
  experiment.push(post_probability_judgment);
  experiment.push(knowledge_test_message);
  if (firstBlock == "coup"){
    experiment = experiment.concat(knowledge_test_coup);
    experiment = experiment.concat(knowledge_test_general);
  }else{
    experiment = experiment.concat(knowledge_test_general);
    experiment = experiment.concat(knowledge_test_coup);
  }
  experiment.push(post_knowledge_test);
  experiment.push(pre_questionnaires_message);
  experiment.push(stai_message);
  experiment = experiment.concat(anxiety);
  experiment.push(gallup_message);
  experiment = experiment.concat(gallup);
  experiment.push(regmode_message);
  experiment = experiment.concat(reg_mode);
  experiment.push(apathy_message);
  experiment = experiment.concat(apathy);
  experiment.push(coup_relevance_message);
  experiment = experiment.concat(coup_relevance);
  experiment.push(coup_reg_message);
  experiment = experiment.concat(coup_reg_focus);
  experiment.push(iwin_message);
  experiment = experiment.concat(iwin);
  experiment.push(demog_message);
  experiment = experiment.concat(demographic_block);
  experiment = experiment.concat(debrief);

  // Prevent right clicking and refreshing the page
  if (!debug) {
    // Prevent right-click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Prompt before refresh
    // Prompt before refresh
    window.addEventListener('beforeunload', preventRefresh);

  }

  // Initiate experiment
  jsPsych.init({
    timeline: experiment,
    preload_images: images
  });

}