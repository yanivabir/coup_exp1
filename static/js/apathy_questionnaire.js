// Apathy Questionnaire - Starkstein Scale
var apathy_items = [
    "האם מעניין אותך ללמוד דברים חדשים?",
    "האם משהו מעניין אותך?",
    "האם את/ה מודאג/ת ממצבך?",
    "האם את/ה משקיע מאמץ בדברים?",
    "האם את/ה תמיד מחפש/ת דברים לעשות?",
    "יש לך תכניות ויעדים לעתיד?",
    "יש לך מוטיבציה?",
    "יש לך אנרגיה לפעילויות יומיומיות?",
    "האם מישהו צריך להגיד לך מה לעשות כל יום?",
    "האם את/ה אדיש/ה למה שקורה?",
    "האם יש הרבה דברים שלא מזיזים לך?",
    "האם את/ה צריכ/ה דחיפה כדי להתחיל עם דברים",
    "האם את/ה לא שמח/ה ולא עצוב/ה, רק בין לבין?",
    "האם את/ה אָפַּתִי/ת"
  ];
  
  var apathy = [];
  
  for (i = 0; i < Math.ceil(apathy_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (apathy_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + apathy_items[i * 4 + j] + "</div>",
          labels: ["1<br>בכלל לא", "2<br>מעט", "3<br>במידת מה", "4<br>מאוד"
          ],
          name: "apathy_" + (i * 4 + j),
          required: false
        });
      }
  
    }
  
    apathy.push({
      type: "survey-likert",
      preamble: "",
      questions: these_q,
      scale_width: 400,
      post_trial_gap: 200,
      data:{
        category: "apathy"
      },
      button_label: "המשך"
    });
  }

// Message that shows up before apathy questionnaire
var apathy_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>כעת תמשיכו לענות על שאלות בנוגע לעצמכם.</p> \
  אנא קראו כל אחת מהשאלות הבאות, ובחרו על הסולם את התשובה המתאימה ביותר לתאר אתכם.</p> \
  <p>אין תשובות נכונות או שגויות בשאלון הזה.</p></div>',
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
      category: 'apathy_message'
    },
    post_trial_gap: 200
}
  