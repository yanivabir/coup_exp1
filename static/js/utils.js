// Functions and routines needed throughout the experiment
// Parameters
var maxWarining = 10; // Number of warining to give a participant before terminating experiment

// Code

// Message terminating the experiment due to bad behavior
var kick_out = {
  type: 'html-keyboard-response',
  conditional_function: function() {
    if (jsPsych.data.get().last(1).select('n_warnings').values[0] > maxWarining) {
      return true;
    } else {
      return false;
    }
  },
  timeline: [{
    stimulus: "<div class = 'instructions'>\
    <p>נראה שאתם לא ממלאים אחר ההוראות.</p>\
    <p>המחקר ייעצר כעת.</p>\
    <p>אם אתם חושבים שזו טעות, אנא כתבו לכתובת:  \
    ya2402+midgam@columbia.edu</p>\
    <p>לחצו על מקש הרווח להמשך</p></div>"
  }],
  choices: [32],
  on_finish: function() {
    var subject = jsPsych.data.get().last(1).select('PID').values[0];
    var d = new Date;
    saveData(PID, sess, '', jsPsych.data.get().csv(),
      function() {
        saveData(PID, sess, '_int', jsPsych.data.getInteractionData().csv(),
      function() {
        jsPsych.endExperiment();
      });
      });
  },
  data: {
    category: 'kick-out'
  }
}

// Make sure fullscreen is kept, warn otherwise and return to full screen
var fullscreen_prompt = {
  type: 'fullscreen',
  fullscreen_mode: true,
  timeline: [
    {
      message: '<div class="instructions"><p>אתר המחקר פועל רק במצב מסך מלא. בכדי לחזור למסך מלא, ולהמשיך במחקר, לחצו על הכפתור מטה</p></div>'
    }
  ],
  conditional_function: check_fullscreen,
  on_finish: function() {
    // Update warning count
    var up_to_now = parseInt(jsPsych.data.get().last(1).select('n_warnings').values);
    jsPsych.data.addProperties({
      n_warnings: up_to_now + 1
    });
  },
  data: {
    category: 'fullscreen-prompt'
  }
}

// Function that checks for fullscreen
function check_fullscreen(){
  if (PID.includes("debug")){
    return false
  }

  var int = jsPsych.data.getInteractionData(),
  exit = int.values().filter(function(e){
    return e.event == "fullscreenexit"
  }),
  enter = int.values().filter(function(e){
    return e.event == "fullscreenenter"
  });

  if (exit.length > 0){
    return exit[exit.length - 1].time > enter[enter.length - 1].time
  }else{
    return false
  }
}

// Save data to file functions
function saveData(PID, sess, part, data, onComplete = function() {}, type = 'csv') {
  console.log(onComplete)
  var d = new Date;
  name = 'S' + PID + '_sess' + sess + '_' + d.toISOString().slice(0, 10) +
    part + '.' + type;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onComplete);
  xhr.open('POST', 'write_data.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    filename: name,
    filedata: data
  }));
}

// Create stimulus list for second session
function createSecondSesssList(data){
  var questions = data.filter({category: "wait_question"}).filter({button_pressed: "1"}).values();
  var answers = data.filter({category: "wait_answer"}).values();

  var m = new Map();
  
  answers.forEach(function(x) {
    x.answer = x.stimulus; 
    x.question = null; 
    delete x.stimulus;
    delete x.trial_type;
    m.set(x.questionId, x);
  });

  questions.forEach(function(x) {
    var existing = m.get(x.questionId);
    if (existing === undefined)
        console.log("missed answer " + x.questionId)
    else
        x.question = x.stimulus;
        delete x.stimulus;
        delete x.trial_type;
        Object.assign(existing, x);
  });

  var result = Array.from(m.values());

  return result
}
