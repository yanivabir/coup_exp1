// Functions and routines needed throughout the experiment
// Parameters
var maxWarining = 10, // Number of warining to give a participant before terminating experiment
  postTooSlowTime = 800, // ITI post warning message
  tooSlowTime = 1000; // Duration of warning message

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
    <p>It seems that you are not performing the task as instructed.</p>\
    <p>Please return this HIT.</p>\
    <p>If you feel that this is a mistake, please email \
    ya2402+mturk@columbia.edu</p>\
    <p>Press the space bar to continue.</p></div>"
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

// Show question response deadline warning, and update the warning counter
var too_slow = [kick_out, {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size: 150%">Please choose more quickly</div>',
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


// Make sure fullscreen is kept, warn otherwise and return to full screen
var fullscreen_prompt = {
  type: 'fullscreen',
  fullscreen_mode: true,
  timeline: [
    {
      message: '<div class="instructions"><p>This study has to run in fullscreen mode.</p><p>To switch to full screen mode \
        and restart the experiment, press the button below.</p></div>'
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

