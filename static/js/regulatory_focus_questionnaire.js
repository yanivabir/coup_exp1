// Regulatory Focus Questionnaire
var reg_focus_items = [
    "I don't mind doing things even if they involve extra effort.",
    "I never evaluate my social interactions with others after they occur.",
    "I am a workaholic.",
    "I feel excited just before I am about to reach a goal.",
    "I enjoy actively doing things, more than just watching and observing.",
    "I spend a great deal of time taking inventory of my positive and negative characteristics.",
    "I like evaluating other people's plans.",
    "I am a doer.",
    "I often compare myself with other people.",
    "I don't spend much time thinking about ways others could improve themselves.",
    "I often critique work done by myself and others.",
    "I believe one should never engage in leisure activities.",
    "When I finish one project, I often wait awhile before getting started on a new one.",
    "I have never been late for work or for an appointment.",
    "I often feel that I am being evaluated by others.",
    "When I decide to do something, I can't wait to get started.",
    "I always make the right decision.",
    "I never find faults in someone I like.",
    "I am a critical person.",
    "I am very self-critical and self-conscious about what I am saying.",
    "By the time I accomplish a task, I already have the next one in mind.",
    "I often think that other people's choices and decisions are wrong.",
    "I have never hurt another person's feelings.",
    "I am a low energy person.",
    "Most of the time my thoughts are occupied with the task I wish to accomplish.",
    "I feel that there is no such thing as an honest mistake.",
    "I rarely analyze the conversations I have had with others after they occur.",
    "When I get started on something, I usually persevere until I finish.",
    "I am a go-getter.",
    "When I meet a new person I usually evaluate how well he or she is doing on various dimensions (e.g., looks, achievements, social status, clothes)."
  ];
  
  var reg_focus = [];
  
  for (i = 0; i < Math.ceil(reg_focus_items.length / 4); i++) {
    var these_q = []
    for (j = 0; j < 4; j++) {
      if (reg_focus_items[i * 4 + j]) {
        these_q.push({
          prompt: "<div id='instruct'>" + reg_focus_items[i * 4 + j] + "</div>",
          labels: ["1<br>Strongly Disagree", "2<br>Moderately Disagree", "3<br>Slightly Disagree", "4<br>Slightly Agree", "5<br>Moderately Agree", "6<br>Strongly Agree"
          ],
          name: "reg_focus_" + (i * 4 + j),
          required: false
        });
      }
  
    }
  
    reg_focus.push({
      type: "survey-likert",
      preamble: "",
      questions: these_q,
      scale_width: 700,
      post_trial_gap: 200,
      data:{
        category: "regulatory_focus"
      }
    });
  }
  