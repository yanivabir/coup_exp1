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

// Instructions
var probability_judgement_instructions = {
    type: "html-button-response",
    timeline: [{
      stimulus: jsPsych.timelineVariable("text")
    }],
    timeline_variables: [{
      text: function(){return "<div id='instruct'><p>בחלק הבא, יוצגו בפניכם תיאורים קצרים של אירועים שונים.</p>\
        <p>עבור כל אחד מהאירועים, נבקש שתעריכו את הסיכוי שיתרחש, מ-0% (בודאות לא יקרה) ועד 100% (בודאות יקרה).</p></div>"}
    },
    {
      text: "<div id='instruct'><p>אנחנו מתעניינים בהתרשמותך האישית. לכן, חשוב להסתמך רק על הידע האישי שלך, ולענות ״בשליפה״.</p>\
        <p>לחצ/י על המשך כדי להתחיל בחלק הזה של המחקר.</p></div>",
    }
    ],
    choices: ["המשך"],
    data: {
      category: "curiosity_rating_instructions"
    }
  }

// Message that shows up before the questionnaire section
var post_probability_judgment = {
    type: "html-button-response",
    stimulus: "<div id='instruct'>.סיימנו את החלק הזה במחקר. לחצו על ״המשך״ כדי לעבור לחלק הבא\
    </div>",
    choices: ["המשך"],
    margin_vertical: "80px",
    data: {
    category: 'post_probability_judgment'
    },
    post_trial_gap: 200
    }
    