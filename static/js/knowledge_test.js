// Coup knowledge test ----------

// Pre questionnaire message
var knowledge_test_message = {
    type: "html-button-response",
    stimulus: '<div id="instruct"><p>בחלק הבא נבקש שתענו על מספר שאלות מרובות ברירה (״שאלות אמריקאיות״) הנוגעות לנושאי משפט וחוקה בישראל.</p>\
    <p>אל תבזבזו יותר מדי זמן על כל שאלה, אלא בחרו את האפשרות שנראית לכם הנכונה ביותר, על בסיס הידע הקיים שלכם.</p></div>',
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
        category: 'knowledge_test_message'
    },
    post_trial_gap: 200
  }

// Message post this section
var post_knowledge_test = {
    type: "html-button-response",
    stimulus: "<div id='instruct'>סיימנו את החלק הזה במחקר. לחצו על ״המשך״ כדי לעבור לחלק הבא.\
    </div>",
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
    category: 'post_knowledge_test'
    },
    post_trial_gap: 200
    }
  

// Load items from csv
Papa.parse("../static/knowledge_test_items.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      knowledge_test_items = results.data;
      knowledge_test_coup = constructKnowledgeTest(knowledge_test_items, "coup");
      knowledge_test_general = constructKnowledgeTest(knowledge_test_items, "general");
    }
  }
);

// Construct questionnaire trials
function constructKnowledgeTest(knowledge_test_items, block) {

    knowledge_test_items = jsPsych.randomization.shuffle(knowledge_test_items.filter(x => x['block'] == block))
    
    knowledge_test = [];

    for (i = 0; i < Math.ceil(knowledge_test_items.length / 2); i++) {
      var these_q = []
      var corrects = []
      for (j = 0; j < 2; j++) {
        this_item = knowledge_test_items[i * 2 + j]
        if (this_item) {
          these_q.push({
            prompt: "<div id='instruct'>" + this_item['prompt'] + "</div>",
            options: jsPsych.randomization.shuffle([this_item['opt0'], this_item['opt1'], this_item['opt2'], this_item['opt3']]),
            name: this_item['itemId'],
            required: true
          });
          corrects.push(this_item['opt' + this_item['correct']]);
        }
    
      }
    
      knowledge_test.push({
        type: "survey-multi-choice",
        questions: these_q,
        scale_width: 400,
        post_trial_gap: 200,
        data:{
          category: "knowledge_test",
          block: block,
          correct_answers: corrects
        },
        button_label: "המשך"
      });
    }
  return knowledge_test
}
