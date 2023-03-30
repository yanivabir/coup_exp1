// Pleasure Questionnaire - Snaith Hamilton Pleasure Scale
var pleasure_items = [
    "I would enjoy my favorite show or podcast.",
    "I would enjoy being with family or close friends.",
    "I would find pleasure in my hobbies and pastimes.",
    "I would be able to enjoy my favorite meal.",
    "I would enjoy a warm bath or a refreshing shower.",
    "I would find pleasure in the scent of flowers or the smell of a fresh sea breeze or freshly baked bread.",
    "I would enjoy seeing other people's smiling faces",
    "I would enjoy looking good when I have made an effort with my appearance.",
    "I would enjoy reading a book, magazine, or newspaper.",
    "I would enjoy a cup of tea or coffee or my favorite drink.",
    "I would find pleasure in small things; e.g., bright sunny day, a text or a call from a friend.",
    "I would be able to enjoy a beautiful landscape or view.",
    "I would get pleasure from helping others.",
    "I would feel pleasure when I receive praise from other people.",
  ];
  
  var pleasure = [];
  
  for (i = 0; i < Math.ceil(pleasure_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (pleasure_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + pleasure_items[i * 4 + j] + "</div>",
          labels: ["1<br>Strongly Disagree", "2<br>Disagree", "3<br>Agree", "4<br>Strongly Agree"
          ],
          name: "pleasure_" + (i * 4 + j),
          required: false
        });
      }
  
    }
  
    pleasure.push({
      type: "survey-likert",
      preamble: "",
      questions: these_q,
      scale_width: 400,
      post_trial_gap: 200,
      data:{
        category: "pleasure"
      }
    });
  }

// Message that shows up before pleasure questionnaire
var pleasure_message = {
  type: "html-button-response",
  stimulus: '<div id="instruct"><p>You will now continue answering questions about yourself.</p> \
  You will read statements people often use to describe themselves. Please use the scale below each statement\
  to indicate the degree to which these statements accurately describe you.</p> \
  <p>There are no right or wrong answers.</p></div>',
    choices: ["Continue"],
    margin_vertical: "80px",
    data: {
      category: 'pleasure_message'
    },
    post_trial_gap: 200
}
