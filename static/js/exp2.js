// Parameters
var sess = 2,
  version = 1.0
var images = [];

// ------- Determine subject level variables ----- //
var PID = jsPsych.data.getURLVariable('uid');

// Is this a debug run?
var debug = PID.includes("debug");

// Keep important variables in global scope for convenience
var viewed_answers,
  firstBlock;

// Load items from local csv file
Papa.parse("../../data/S" + PID + "_secondSessStims.csv", {
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


  // Shuffle questions for recall
  viewed_answers = shuffle_viewed_answers(viewed_answers);

  // Answer recall block
  var answer_recall_block = {
    timeline: recall_trial,
    timeline_variables: viewed_answers
  }


  // Debriefing and data upload
  var debrief = [{
    type: "instructions",
    pages: ['<div id="instruct">תודה על השתתפותך במפגש הראשון של המחקר!<p>\
    במחקר זה אנו בוחנים את הסקרנות של אנשים שונים לשאלות מתחומים שונים.</p>\
    <p>המידע המשפטי שהוצג במסגרת המחקר מבוסס על פרסומים בעיתונות ובערוצים ממשלתיים. המידע שהוצג אינו מהווה תחליף לייעוץ משפטי בכל מקרה.</p>\
    </div>'],
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
            window.location.replace("https://www.midgampanel.com/surveyThanks2.asp?USER=" + PID + "&status=OK");
          });
        });
    }
}
];


  // Put it all together
  experiment.push(fullscreen);
  experiment.push(recall_instructions1);
  experiment = experiment.concat(answer_recall_block);
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
