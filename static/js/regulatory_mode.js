// Regulatory Mode Questionnaire
var reg_mode_items = [
  {
    prompt: "לא אכפת לי לעשות דברים שמצריכים מאמץ מיוחד.",
    item: "reg_Q1"
  },
  {
    prompt: "אני מכור/ה לעבודה.",
    item: "reg_Q3"
  },  
  {
    prompt: "אני מתרגש/ת כשאני עוד רגע מגשים/ה אחד מהיעדים שלי.",
    item: "reg_Q4"
  },  
  {
    prompt: "יותר כיף לי להיות פעיל/ה ולעשות דברים מאשר לצפות מהצד.",
    item: "reg_Q5"
  }, 
  {
    prompt: "אני בן אדם של מעשים ולא דיבורים",
    item: "reg_Q8"
  }, 
  {
    prompt: "כשאני מסיים/ת פרוייקט, אני בדרך כלל מחכה קצת לפני שאני מתחיל/ה פרוייקט חדש.",
    item: "reg_Q13"
  }, 
  {
    prompt: "אף פעם לא איחרתי לעבודה או לפגישה.",
    item: "reg_lie_Q14"
  }, 
  {
    prompt: "כשאני מחליט/ה לעשות משהו, ממש בא לי כבר להתחיל.",
    item: "reg_Q16"
  }, 
  {
    prompt: "אני תמיד בוחר/ת נכון.",
    item: "reg_lie_Q17"
  }, 
  {
    prompt: "כשאני מסיים/ת מטלה, אני כבר חושב/ת על המטלה הבאה.",
    item: "reg_Q21"
  },  
  {
    prompt: "מעולם לא פגעתי ברגשות של אדם אחר.",
    item: "reg_lie_Q23"
  }, 
  {
    prompt: "יש לי אנרגיות נמוכות.",
    item: "reg_Q24"
  },  
  {
    prompt: "רוב הזמן המחשבות שלי עוסקות במשימה שאני רוצה להצליח בה.",
    item: "reg_Q25"
  },  
  {
    prompt: "כשאני מתחיל משהו, אני בדרך כלל מתמיד/ה עד שאני מסיים/ת איתו.",
    item: "reg_Q28"
  },  
  {
    prompt: "אני שאפתן/ית.",
    item: "reg_Q29"
  }
  ];
  
  var reg_mode = [];
  
  for (i = 0; i < Math.ceil(reg_mode_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (reg_mode_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + reg_mode_items[i * 4 + j]['prompt'] + "</div>",
          labels: ["1<br>מאוד לא מסכים/ה", "2<br>לא מסכים/ה במידה", "3<br>קצת לא מסכים/ה", "4<br>קצת מסכים/ה", "5<br>מסכים/ה במידה", "6<br>מסכים/ה מאוד"
          ],
          name: reg_mode_items[i * 4 + j]['item'],
          required: false
        });
      }
  
    }
  
    reg_mode.push({
      type: "survey-likert",
      preamble: "",
      questions: these_q,
      scale_width: 700,
      post_trial_gap: 200,
      button_label: 'המשך',
      data:{
        category: "reg_mode"
      }
    });
  }
  