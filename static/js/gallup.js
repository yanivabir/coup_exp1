// Gallup world poll
var gallup_questions = [
  {
    prompt: "<div id='instruct'>בסך הכל, עד כמה את/ה מרוצה מהחיים שלך בזמן האחרון? ענו בסולם של 0 עד 10, כש-0 זה לא מרוצים, ו-10 זה מרוצים. </div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup01"
  },
  {
    prompt: "<div id='instruct'>האם הרגשת אתמול כעס במשך הרבה מהיום?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup02"
  },
  {
    prompt: "<div id='instruct'>האם הרגשת אתמול דיכאון במשך הרבה מהיום?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup03"
  },
  {
    prompt: "<div id='instruct'>האם הרגשת אתמול הנאה במשך הרבה מהיום?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup04"
  },
  {
    prompt: "<div id='instruct'>האם הרגשת אתמול שמחה במשך הרבה מהיום?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup05"
  },
  {
    prompt: "<div id='instruct'>האם הרגשת אתמול עצב במשך הרבה מהיום?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup06"
  },
  {
    prompt: "<div id='instruct'>האם הרגשת אתמול לחץ במשך הרבה מהיום?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup07"
  },
  {
    prompt: "<div id='instruct'>האם הרגשת אתמול דאגה במשך הרבה מהיום?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup08"
  },
  {
    prompt: "<div id='instruct'>כעת חשבו על אתמול, מהבוקר עד סוף היום. חשבו איפה הייתם, מה עשיתם, עם מי הייתם ומה הרגשתם. האם למדת משהו או עשית משהו מעניין אתמול?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup09"
  },
  {
    prompt: "<div id='instruct'>כעת חשבו על אתמול, מהבוקר עד סוף היום. חשבו איפה הייתם, מה עשיתם, עם מי הייתם ומה הרגשתם. האם חייכת או צחקת הרבה אתמול?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup10"
  },
  {
    prompt: "<div id='instruct'>כעת חשבו על אתמול, מהבוקר עד סוף היום. חשבו איפה הייתם, מה עשיתם, עם מי הייתם ומה הרגשתם. האם היית רוצה שיהיו לך עוד ימים כמו אתמול?</div>",
    options: ["כן", "לא"],
    horizontal: true,
    name: "gallup12"
  },
  {
    prompt: "<div id='instruct'>דמיינו סולם, שהשלבים בו ממוספרים מ-0 בתחתית ל-10 בראשו.\
     נניח שראש הסולם מייצג את החיים הכי טובים שיכולים להיות לכם, ותחתית הסולם את החיים הכי גרועים שיכולים להיות לכם.\
      על איזה שלב בסולם אתם מרגישים שאתם עומדים כרגע?\
       ככל שאתם מרגישים טוב יותר לגבי החיים שלכם, השלב צריך להיות גבוה יותר,\
        וככל שאתם מרגישים גרוע יותר, השלב נמוך יותר. איזה שלב הוא הקרוב ביותר למה שאתם מרגישים?</div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup13"
  },
  {
    prompt: "<div id='instruct'>דמיינו סולם, שהשלבים בו ממוספרים מ-0 בתחתית ל-10 בראשו.\
    נניח שראש הסולם מייצג את החיים הכי טובים שיכולים להיות לכם, ותחתית הסולם את החיים הכי גרועים שיכולים להיות לכם.\
     על איזה שלב בסולם עמדתם לפני חמש שנים?</div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup14"
  },
  {
    prompt: "<div id='instruct'>דמיינו סולם, שהשלבים בו ממוספרים מ-0 בתחתית ל-10 בראשו.\
    נניח שראש הסולם מייצג את החיים הכי טובים שיכולים להיות לכם, ותחתית הסולם את החיים הכי גרועים שיכולים להיות לכם.\
     על איזה שלב בסולם תעמדו בעוד חמש שנים מעכשיו?</div>",
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    horizontal: true,
    name: "gallup15"
  },
];

var gallup = []
for (i=0; i<Math.ceil(gallup_questions.length / 3); i++){
    gallup.push({
    type: 'survey-multi-choice',
    data: {
      category: "gallup"
    },
    questions: gallup_questions.slice(i * 3, i * 3 + 3),
    button_label: "המשך"
  })
}
