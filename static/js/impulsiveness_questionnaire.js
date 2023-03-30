// Impulsiveness Questionnaire - Barratt Impulsiveness Scale
var impulsive_items = [
    "I plan tasks carefully.",
    "I do things without thinking.",
    "I make-up my mind quickly.",
    "I am happy-go-lucky.",
    "I don't pay attention.",
    "I have racing thoughts.",
    "I plan trips well ahead of time.",
    "I am self-controlled.",
    "I concentrate easily.",
    "I save regularly.",
    "I squirm at plays or lectures.",
    "I am a careful thinker.",
    "I plan for job security.",
    "I say things without thinking.",
    "I like to think about complex problems.",
    "I change jobs.",
    "I act on impulse.",
    "I get easily bored when solving thought problems.",
    "I act on the spur  of the moment.",
    "I am a steady thinker.",
    "I change residences.",
    "I buy things on impulse.",
    "I can only think about one thing at a time.",
    "I change hobbies.",
    "I spend or charge more than I earn.",
    "I often have extraneous thoughts when thinking.",
    "I am more interested in the present than the future.",
    "I am restless at the theater or lectures.",
    "I like puzzles.",
    "I am future oriented."

  ];
  
  var impulsive = [];
  
  for (i = 0; i < Math.ceil(impulsive_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (impulsive_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + impulsive_items[i * 4 + j] + "</div>",
          labels: ["1<br>Rarely/Never", "2<br>Occasionally", "3<br>Often", "4<br>Almost Always/ Always"
          ],
          name: "impulsive_" + (i * 4 + j),
          required: false
        });
      }
  
    }
  
    impulsive.push({
      type: "survey-likert",
      preamble: "",
      questions: these_q,
      scale_width: 400,
      post_trial_gap: 200,
      data:{
        category: "impulsive"
      }
    });
  }

  // Message that shows up before impulsiveness questionnaire
var impulse_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>You will now continue answering questions about yourself.</p> \
  <p>People differ in the ways they act and think in different situations.</p> \
  Please read each of the following statements carefully and use the scale below them to indicate \
  the option that best describes how often you act or behave that way.</p> \
  <p>Please answer these questions as truthfully and accurately as possible.</p></div>',
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'impulse_message'
    },
    post_trial_gap: 200
}

  