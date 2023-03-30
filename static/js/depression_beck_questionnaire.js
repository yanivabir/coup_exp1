// Depression Questionnaire - Beck's Inventory
  
var depression_beck = {
  type: "survey-multi-choice",
  preamble: "<div id='instruct'>As you read each of the following statements, consider how \
  you have been feeling <b>the past 2 weeks, including today.</b></div>",
  
  questions: [
    {
      prompt: "1)", 
      name: 'depression_beck_1', 
      options: ['0. I do not feel sad.', '1. I feel sad much of the time.', '2. I am sad all  the time.', '3. I am so sad or unhappy that I cannot stand it.'], 
      required: true
    }, 
    {
      prompt: "2)", 
      name: 'depression_beck_2', 
      options: ['0. I am not  discouraged about my future.', '1. I feel more discouraged about my future than I used to be.', '2. I do not expect things to work out for me.', '3. I feel my future is hopeless and will only get worse.'], 
      required: true
    },
    {
      prompt: "3)", 
      name: 'depression_beck_3', 
      options: ['0. I do not feel like a failure.', '1. I have failed more than I should have.', '2. As I look back, I see a lot of failures.', '3. I feel I am a total failure as a person.'], 
      required: true
    },
    {
      prompt: "4)", 
      name: 'depression_beck_4', 
      options: ['0. I get as much pleasure as I ever did from the things i enjoy.', '1. I do not enjoy things as much as I used to.', '2. I get very little pleasure from the things I used to enjoy.', '3. I cannot get any pleasure from the  things I used to enjoy.'], 
      required: true
    },
    {
      prompt: "5)", 
      name: 'depression_beck_5', 
      options: ['0. I do not feel particularly guilty.', '1. I feel guilty over many things I have done or should have done.', '2. I feel quite guilty most of the time.', '3. I feel guilty all of the time.'], 
      required: true
    },
    {
      prompt: "6)", 
      name: 'depression_beck_6', 
      options: ['0. I do not feel I am being punished.', '1. I feel I may be punished.', '2. I expect to be punished.', '3. I feel I am being punished.'], 
      required: true
    },
    {
      prompt: "7)", 
      name: 'depression_beck_7', 
      options: ['0. I feel the same about myself as ever.', '1. I have lost confidence in myself.', '2. I am disappointed in myself.', '3. I dislike myself.'], 
      required: true
    },
    {
      prompt: "8)", 
      name: 'depression_beck_8', 
      options: ['0. I do not criticize or blame myself more than usual.', '1. I am more critical of myself than I used to be.', '2. I criticize myself for all of my faults.', '3. I blame myself for everything bad that happens.'], 
      required: true
    },
    {
      prompt: "9)", 
      name: 'depression_beck_9', 
      options: ['0. I do not cry anymore than I used to.', '1. I cry more than I used to.', '2. I cry over every little  thing.', '3. I feel like crying, but I cannot cry.'], 
      required: true
    },
    {
      prompt: "10)", 
      name: 'depression_beck_10', 
      options: ['0. I am more restless or wound up than usual.', '1. I feel more restless or wound up than usual.', '2. I am so restless or agitates that it is hard to stay still.', '3. I am so restless or agitated that I have to keep moving or doing something.'], 
      required: true
    },
    {
      prompt: "11)", 
      name: 'depression_beck_11', 
      options: ['0. I have not lost interest in other people or activities.', '1. I am less interested in other people  or things than before.', '2. I have lost most of my interest in other people or things.', '3. It is hard to get interested in anything.'], 
      required: true
    },
    {
      prompt: "12)", 
      name: 'depression_beck_12', 
      options: ['0. I make decisions about as well as ever.', '1. I find it more difficult to make decisions than usual.', '2. I have much greater difficulty in making decisions than I used to.', '3. I have trouble making any decisions.'], 
      required: true
    },
    {
      prompt: "13)", 
      name: 'depression_beck_13', 
      options: ['0. I do not feel I am worthless.', '1. I do not consider myself as worthwhile and useful as I used to.', '2. I feel more worthless as compared to other people.', '3. I feel utterly worthless.'], 
      required: true
    },
    {
      prompt: "14)", 
      name: 'depression_beck_14', 
      options: ['0. I have as much energy as ever.', '1. I have less energy than I used to have.', '2. I do not have enough energy to do very much.', '3. I do not have enough energy to do anything.'], 
      required: true
    },
    {
      prompt: "15)", 
      name: 'depression_beck_15', 
      options: ['0. I have not experienced any change in my sleeping pattern.', '1. I sleep somewhat more than usual. <b>OR</b>  I sleep somewhat less than usual.', '2. I sleep a lot more than usual. <b>OR</b>  I sleep a lot less than usual.', '3. I sleep most of the day. <b>OR</b>  I wake up 1-2 hours early and cannot get back to sleep.'], 
      required: true
    },
    {
      prompt: "16)", 
      name: 'depression_beck_16', 
      options: ['0. I am no more irritable than usual.', '1. I am more irritable than usual.', '2. I am much more irritable than usual.', '3. I am irritable all the time.'], 
      required: true
    },
    {
      prompt: "17)", 
      name: 'depression_beck_17', 
      options: ['0. I have not experienced any change in my appetite.', '1. My appetite is somewhat less than usual. <b>OR</b>  My appetite is somewhat greater than usual.', '2. My appetite is much less than before. <b>OR</b>  My appetite is much greater than usual.', '3. I have no appetite at all. <b>OR</b>  I crave food all the time.'], 
      required: true
    },
    {
      prompt: "18)", 
      name: 'depression_beck_18', 
      options: ['0. I can concentrate as well as ever.', '1. I cannot concentrate as well as usual.', '2. It is hard to keep my mind on anything for very long.', '3. I find I cannot concentrate on anything.'], 
      required: true
    },
    {
      prompt: "19)", 
      name: 'depression_beck_19', 
      options: ['0. I am no more tired or fatigued than usual.', '1. I get more tired or fatigued more easily than usual.', '2. I am too tired or fatigued to do a lot of the things I used  to do.', '3. I am too tired or fatigued to do most of the things I used  to do.'], 
      required: true
    }
  ],
};

// Show 2 questions per page
for (i = 0; i < Math.ceil(depression_beck.length / 2); i++) {
  var these_q = []
  for (j = 0; j < 2; j++) {
  these_q.push(depression_beck[i * 2 + j])  
  };
}