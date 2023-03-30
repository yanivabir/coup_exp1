// Javascript functions and varialbes for meusring ratings about questions

// This is the list of probes each question should be rated on
var rating_probes = [[{
    prompt: "...is probably complicated",
    labels: ["1<br>Not complicated at all", "2", "3", "4", "5", "6", "7<br>Very complicated"],
    required: true,
    name: "pars_complicated"
  },
  {
    prompt: "...is probably simple",
    labels: ["1<br>Not simple at all", "2", "3", "4", "5", "6", "7<br>Very simple"],
    required: true,
    name: "pars_simple"
  }],
  [{
    prompt: "...is something that has an element of randomness",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true,
    name: "epstm_random_element"
  },
  {
    prompt: "...is determined by a chance factor",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true,
    name: "epstm_detemined_chance"
  }],
  [{
    prompt: "...is knowable in principle, given enough information",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true,
    name: "epstm_knowable"
  },
  {
    prompt: "…is something that well-informed people would agree on",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very much"],
    required: true,
    name: "epstm_informed_agree"
  }],
  [{
    prompt: "...would be easy to remember in the long term",
    labels: ["1<br>Not easy at all", "2", "3", "4", "5", "6", "7<br>Very easy"],
    required: true,
    name: "memory_easy"
  },
  {
    prompt: "…would be difficult to remember in the long term",
    labels: ["1<br>Not dificult at all", "2", "3", "4", "5", "6", "7<br>Very difficult"],
    required: true,
    name: "memory_difficult"
  }],
  [{
    prompt: "...would be useful for me to know",
    labels: ["1<br>Not useful at all", "2", "3", "4", "5", "6", "7<br>Very useful"],
    required: true,
    name: "useful_me"
  },
  {
    prompt: "...would be useful for me to know",
    labels: ["1<br>Not useful at all", "2", "3", "4", "5", "6", "7<br>Very useful"],
    required: true,
    name: "useful_me"
  }],
  [{
    prompt: "It is easy to imagine what the answer to this question might be.",
    labels: ["1<br>Not easy at all", "2", "3", "4", "5", "6", "7<br>Very easy"],
    required: true,
    name: "simulate_easy"
  },
  {
    prompt: "It is difficult to imagine what the answer to this question might be.",
    labels: ["1<br>Not at all", "2", "3", "4", "5", "6", "7<br>Very difficult"],
    required: true,
    name: "simulate_difficult"
  }]
]

// Choose one of each pair of probes
var chosen_rating_probes = []
for (j = 0; j < rating_probes.length; j++) {
    chosen_rating_probes.push(rating_probes[j][(Math.random()>0.5)+0])  
}

// Rating trial
var rating_trial = [fullscreen_prompt,
  // Introduce questions
  {
    type: "html-button-response",
    stimulus: function() {
      return "<div id='instruct'><p>We are interested in your judgment about this question:</p>\
      <p><i>" + jsPsych.timelineVariable('question', true) + "</i></p></div>"
    },
    choices: ["Continue"],
    data:{
      category: "rating_intro_question",
      questionId: jsPsych.timelineVariable('questionId')
    }
  },
  // First page of probes
  {
    type: "survey-likert",
    preamble: function() {
      return "<p><i>" + jsPsych.timelineVariable('question', true) + "</i></p>\
      <p>The answer to this question...</p>"
    },
    questions: function() {
      return chosen_rating_probes.slice(0, 3)
    },
    scale_width: 400,
    post_trial_gap: 100,
    data:{
      category: "rating_question1",
      questionId: jsPsych.timelineVariable('questionId')
    }
  },
  // Second page of probes
  {
    type: "survey-likert",
    preamble: function() {
      return "<p><i>" + jsPsych.timelineVariable('question', true) + "</i></p>\
      <p>The answer to this question...</p>"
    },
    questions: function() {
      return chosen_rating_probes.slice(3, 5)
    },
    scale_width: 400,
    post_trial_gap: 300,
    data:{
      category: "rating_question2",
      questionId: jsPsych.timelineVariable('questionId')
    }
  },
  // Third page of probes
  {
    type: "survey-likert",
    preamble: function() {
      return "<p><i>" + jsPsych.timelineVariable('question', true) + "</i></p>"
    },
    questions: function() {
      return chosen_rating_probes.slice(5, 6)
    },
    scale_width: 400,
    post_trial_gap: 300,
    data:{
      category: "rating_question3",
      questionId: jsPsych.timelineVariable('questionId')
    }
  },
]

// Rating instructions
var rating_instructions = {
  type: "instructions",
  pages: [
    "<div id='instruct'><p>In the next part of this experiment, you will be \
    presented with 14 questions. We would like you to rate each of these \
    questions on several scales.</p></div>",
    "<div id='instruct'><p>We are interested in your own personal \
    judgment. Therefore it is important that you rely only on your own \
    knowledge and give your best answer \"off the top of your head.\"</p></div>",
    "<div id='instruct'><p>Press the <i>Next</i> button to begin this part of \
    the experiment.</p></div>"
  ],
  show_clickable_nav: true,
  allow_keys: false,
  data: {
    category: "rating_instructions1"
  }
}
