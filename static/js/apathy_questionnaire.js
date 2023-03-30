// Apathy Questionnaire - Starkstein Scale
var apathy_items = [
    "Are you interested in learning new things?",
    "Does anything interest you?",
    "Are you concerned about your condition?",
    "Do you put much effort into things?",
    "Are you always looking for something to do?",
    "Do you have plans and goals for the future?",
    "Do you have motivation?",
    "Do you have the energy for daily activities?",
    "Does someone have to tell you what to do each day?",
    "Are you indifferent to things?",
    "Are you unconcerned with many things?",
    "Do you need a push to get started on things?",
    "Are you neither happy nor sad, just between?",
    "Would you consider yourself apathetic?"
  ];
  
  var apathy = [];
  
  for (i = 0; i < Math.ceil(apathy_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (apathy_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + apathy_items[i * 4 + j] + "</div>",
          labels: ["1<br>Not at all", "2<br>Slightly", "3<br>Some", "4<br>A Lot"
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
      }
    });
  }
  