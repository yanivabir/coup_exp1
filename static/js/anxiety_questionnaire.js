// Anxiety Questionnaire - STAI State
var anxiety_items = [
    "I feel calm.",
    "I feel secure.",
    "I am tense.",
    "I feel strained.",
    "I feel at ease.",
    "I feel upset.",
    "I am presently worrying over possible misfortunes.",
    "I feel satisfied.",
    "I feel frightened.",
    "I feel comfortable.",
    "I feel self-confident.",
    "I feel nervous.",
    "I am jittery.",
    "I feel indecisive.",
    "I am relaxed.",
    "I feel content.",
    "I am worried.",
    "I feel confused.",
    "I feel steady.",
    "I feel pleasant."
  ];
  
  var anxiety = [];
  
  for (i = 0; i < Math.ceil(anxiety_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (anxiety_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + anxiety_items[i * 4 + j] + "</div>",
          labels: ["1<br>Not at all", "2<br>Somewhat", "3<br>Moderately", "4<br>Very much"
          ],
          name: "anxiety_" + (i * 4 + j),
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
        category: "anxiety"
      }
    });
  }
  