// Depression Questionnaire - PHQ-9
var depression_items = [
    "Little interest or pleasure in doing things.",
    "Feeling down, depressed, or hopeless.",
    "Trouble falling or staying asleep, or sleeing too much.",
    "Feeling tired or having little energy.",
    "Poor appetite or overeating.",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down.",
    "Trouble concentrating on things, such as reading the newspaper or watching television.",
    "Moving or speaking so slowly that other people would have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual.",
    "Thoughts that you would be better off dead or hurting yourself in some way."
  ];
  
  var depression = [];
  
  for (i = 0; i < Math.ceil(depression_items.length / 3); i++) {
    var these_q = []
    for (j = 0; j < 3; j++) {
      if (depression_items[i * 3 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + depression_items[i * 3 + j] + "</div>",
          labels: ["1<br>Not at all", "2<br>Several days", "3<br>More than half the days", "4<br>Nearly every day"
          ],
          name: "depression_" + (i * 3 + j),
          required: true
        });
      }
  
    }
  
    depression.push({
      type: "survey-likert",
      preamble: "<div id='instruct'>As you read each of the following statements think about how you felt over the last 2 weeks. Please use the scale below to indicate how often you have been bother by any of the following problems over the last 2 weeks. There are no right or wrong answers.</div>",
      questions: these_q,
      scale_width: 400,
      post_trial_gap: 200,
      data:{
        category: "depression"
      }
    });
  }
  