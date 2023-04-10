// Anxiety Questionnaire - STAI State
var anxiety_items = [
    "אני מרגיש שלו/ה",
    "אני מרגיש/ה בטוח/ה",
    " אני דרוך/ה",
    "אני מרגיש/ה מתוח/ה",
    "אני מרגיש רגוע/ה",
    "אני מרגיש/ה מוטרד/ת",
    "אני חושש/ת עכשיו מאסונות שעלולים להתרחש",
    "אני מרגיש/ה שביעות רצון",
    "אני מרגיש/ה מבוהל/ת",
    "אני חש/ה בנוח",
    "אני מרגיש/ה בטוח/ה בעצמי",
    "אני מרגיש/ה עצבני/ת",
    "אני מרגיש/ה חרד/ה",
    "אני מרגיש/ה חסר/ת יכולת להחליט",
    "אני רגוע/ה",
    "אני חש/ה סיפוק",
    "אני מודאג/ת",
    "אני חש/ה בלבול",
    "אני חש/ה יציבות",
    "יש לי הרגשה נעימה"
  ];
  
  var anxiety = [];
  
  for (i = 0; i < Math.ceil(anxiety_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (anxiety_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + anxiety_items[i * 4 + j] + "</div>",
          labels: ["1<br>כלל לא", "2<br>במקצת", "3<br>במידה בינונית", "4<br>מאוד"
          ],
          name: "stai_" + (i * 4 + j),
          required: false
        });
      }
  
    }
  
    anxiety.push({
      type: "survey-likert",
      preamble: "",
      questions: these_q,
      scale_width: 400,
      post_trial_gap: 200,
      data:{
        category: "stai"
      }
    });
  }
  