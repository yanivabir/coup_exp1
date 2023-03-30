// Five dimensions curiosity questionnaire
var five_d_items = [
  "I view challenging situations as an opportunity to grow and learn.",
  "I am always looking for experiences that challenge how I think about myself and the world.",
  "I seek out situations where it is likely that I will have to think in depth about something.",
  "I enjoy learning about subjects that are unfamiliar to me.",
  "I find it fascinating to learn new information.",
  "Thinking about solutions to difficult conceptual problems can keep me awake at night.",
  "I can spend hours on a single problem because I just can't rest without knowing the answer.",
  "I feel frustrated if I can't figure out the solution to a problem, so I work even harder to solve it.",
  "I work relentlessly at problems that I feel must be solved.",
  "It frustrates me not having all the information I need.",
  "The smallest doubt can stop me from seeking out new experiences.",
  "I cannot handle the stress that comes from entering uncertain situations.",
  "I find it hard to explore new places when I lack confidence in my abilities.",
  "I cannot function well if I am unsure whether a new experience is safe.",
  "It is difficult to concentrate when there is a possibility that I will be taken by surprise.",
  "I like to learn about the habits of others.",
  "I like finding out why people behave the way they do.",
  "When other people are having a conversation, I like to find out what it's about.",
  "When around other people, I like listening to their conversations.",
  "When people quarrel, I like to know what's going on.",
  "The anxiety of doing something new makes me feel excited and alive.",
  "Risk-taking is exciting to me.",
  "When I have free time, I want to do things that are a little scary.",
  "Creating an adventure as I go is much more appealing than a planned adventure.",
  "I prefer friends who are excitingly unpredictable."
];

var five_d = [];

for (i = 0; i < Math.ceil(five_d_items.length / 3); i++) {
  var these_q = []
  for (j = 0; j < 3; j++) {
    if (five_d_items[i * 3 + j]) {
      these_q.push({
        prompt: "<div id='instruct'>" + five_d_items[i * 3 + j] + "</div>",
        labels: ["1<br>Doesn't describe me at all", "2",
          "3", "4", "5", "6", "7<br>Completely describes me"
        ],
        name: "5d_" + (i * 3 + j),
        required: true
      });
    }

  }

  five_d.push({
    type: "survey-likert",
    preamble: "<div id='instruct'>Below are statements people often use to describe themselves. Please use the scale below to indicate the degree to which these statements accurately describe you. There are no right or wrong answers.</div>",
    questions: these_q,
    scale_width: 400,
    post_trial_gap: 200,
    data:{
      category: "curiosity_5d"
    }
  });
}
