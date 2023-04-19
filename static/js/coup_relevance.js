// Coup relevance questionnaire ----------

// Pre questionnaire message
var coup_relevance_message = {
    type: "html-button-response",
    stimulus: '<div id="instruct"><p>בחלק הבא תקראו מספר משפטים העוסקים ברפורמה במערכת המשפט ושיטת הממשל המוצעת על ידי הממשלה הנוכחית. נבקש שתסמנו עבור כל משפט עד כמה אתם מסכימים עמו.</p></div>',
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
        category: 'coup_relevance_message'
    },
    post_trial_gap: 200
  }
  

// Load items from csv
Papa.parse("../static/coup_relevance_questionnaire.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      coup_relevance_items = results.data;
      coup_relevance = constructCoupRelevance(coup_relevance_items);
    }
  }
);

// Construct questionnaire trials
function constructCoupRelevance(coup_relevance_items) {
    
    coup_relevance = [];

    for (i = 0; i < Math.ceil(coup_relevance_items.length / 4); i++) {
      var these_q = []
      for (j = 0; j < 4; j++) {
        if (coup_relevance_items[i * 4 + j]) {
          these_q.push({
            prompt: "<div id='instruct'>" + coup_relevance_items[i * 4 + j]['prompt'] + "</div>",
            labels: ["1<br>כלל לא מסכים/ה", "2", "3", "4", "5<br>מסכים/ה מאוד"],
            name: coup_relevance_items[i * 4 + j]['itemId'],
            required: false
          });
        }
    
      }
    
      coup_relevance.push({
        type: "survey-likert",
        preamble: "סמנו עד כמה אתם מסכימים עם כל אחד מהמשפטים הבאים:",
        questions: these_q,
        scale_width: 400,
        post_trial_gap: 200,
        data:{
          category: "coup_relevance"
        },
        button_label: "המשך"
      });
    }
  return coup_relevance
}
