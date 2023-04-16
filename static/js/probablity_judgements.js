var prob_judge = [{
  type: 'html-vas-response',
    stimulus: function() {
        return "<div id='instruct'><p>" + jsPsych.timelineVariable('item', true) + "</p></div>"
    },
    data: {
        itemId: jsPsych.timelineVariable('itemId'),
        block: jsPsych.timelineVariable('block')
    },
    labels: ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
    ticks: true,
    scale_width: 500,
    scale_colour: 'black',
    required: true,
    button_label: "המשך",
    post_trial_gap: 200
}];