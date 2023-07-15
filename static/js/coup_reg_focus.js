// Coup relevance questionnaire ----------

// Pre questionnaire message
// Load items from csv
Papa.parse("../static/coup_reg_focus.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      coup_reg_items = results.data;
      coup_reg_focus = constructCoupRelevance(coup_reg_items);
    }
  }
);

// Construct questionnaire trials
function constructCoupRelevance(coup_reg_items) {
    
    coup_reg_focus = [];

    for (i = 0; i < Math.ceil(coup_reg_items.length / 4); i++) {
      var these_q = []
      for (j = 0; j < 4; j++) {
        if (coup_reg_items[i * 4 + j]) {
          these_q.push({
            prompt: "<div id='instruct'>" + coup_reg_items[i * 4 + j]['prompt'] + "</div>",
            labels: ["1<br>כלל לא מסכים/ה", "2", "3", "4", "5<br>מסכים/ה מאוד"],
            name: coup_reg_items[i * 4 + j]['itemId'],
            required: false
          });
        }
    
      }
    
      coup_reg_focus.push({
        type: "survey-likert",
        preamble: "כרגע, כשאני חושב/ת על המצב בארץ, ועל הרפורמה המשפטית, אני מתמקד/ת בעיקר ב…",
        questions: these_q,
        scale_width: 400,
        post_trial_gap: 200,
        data:{
          category: "coup_reg_focus"
        },
        button_label: "המשך"
      });
    }

  return coup_relevance
}
