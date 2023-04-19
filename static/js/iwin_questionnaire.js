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
  },
  {
    prompt: "ככלל, העמדה הפוליטית שלי היא:?",
    labels: ["1<br>שמאל קיצוני", "2", "3", "4", "5", "6", "7", "8", "9<br>ימין קיצוני"],
    name: "left_right",
    required: false
  },
  {
    prompt: "כשאת/ה חושב/ת על עצמך באופן כללי, בשאלות הנוגעות לכלכלה וחברה את/ה רואה את עצמך כ:",
    labels: ["1<br>סוציאליסט/ית", "2", "3", "4", "5", "6", "7", "8", "9<br>קפיטליסט/ית"],
    name: "socialism_capitalism",
    required: false
  },
  {
    prompt: "באופן כללי, עד כמה את/ה מגדיר את עצמך חילוני/דתי?",
    labels: ["1<br>חילוני/ת", "2", "3", "4", "5", "6", "7", "8", "9<br>דתי/ית"],
    name: "secular_religious",
    required: false
  },
];
  
var iwin = [];
  
  for (i = 0; i < Math.ceil(iwin_items.length / 3); i++) {
    var these_q = []
    for (j = 0; j < 3; j++) {
      if (iwin_items[i * 3 + j]) {
        these_q.push(iwin_items[i * 3 + j]);
      }
    }
  
    iwin.push({
      type: "survey-likert",
      preamble: "",
      questions: these_q,
      scale_width: 400,
      post_trial_gap: 200,
      data:{
        category: "iwin"
      },
      button_label: "המשך"
    });
  }
  