// IWIN
var iwin_items = [
  {
    prompt: "כשאת/ה חושב/ת על עצמך באופן כללי, עד כמה חשובה לזהות האישית שלך עובדת היותך ישראלי/ת?",
    labels: ["1<br>לא חשובה כלל", "2", "3", "4", "5", "6", "7", "8", "9<br>חשובה מאוד"],
    name: "iwin_1",
    required: false
  },
  {
    prompt: "כשאת/ה חושב/ת על עצמך באופן כללי, איך היית מגדיר את יחסך לציונות:",
    labels: ["1<br>לא אוהד כלל", "2", "3", "4", "5", "6", "7", "8", "9<br>אוהד מאוד"],
    name: "iwin_2",
    required: false
  },
  {
    prompt: "כשאת/ה חושב/ת על עצמך באופן כללי, עד כמה את/ה מזדהה עם הלאומיות הישראלית?",
    labels: ["1<br>לא מזדהה כלל", "2", "3", "4", "5", "6", "7", "8", "9<br>מזדהה מאוד"],
    name: "iwin_3",
    required: false
  }
];
  
var iwin = {
    type: "survey-likert",
    preamble: "",
    questions: iwin_items,
    scale_width: 400,
        post_trial_gap: 200,
    data:{
        category: "iwin"
    },
    button_label: "המשך"
};

var iwin_message = {
    type: "html-button-response",
    stimulus: '<div id="instruct"><p>כעת נשאל על שלוש שאלות הנוגעות לתחושות והעמדות שלך.</p></div>',
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
        category: 'iwin_message'
    },
    post_trial_gap: 200
}
  