let htmlLine = document.querySelector(".graph-line3");
let cssLine = document.querySelector(".graph-line2");
let jsLine = document.querySelector(".graph-line1");

if (localStorage.getItem("name") == null) {
  let ourName = prompt("Введите ваше имя!");
  localStorage.setItem("name", ourName);
}

var questions = [
  {
    text: "1. Какое свойство позволяет указать фоновое изображение для бордюра?",
    answers: ["border-src", "border-image", "border-background", "border-url"],
    correctAnswer: 1, // нумерация ответов с нуля!
  },
  {
    text: "2. Медиа-запросы можно использовать в случаях работы",
    answers: ["с CSS директивой @queries", "с HTML-элементом link", "с CSS директивой @media", "с CSS директивой @include"],
    correctAnswer: 2,
  },
  {
    text: "3. Какая из записей медиа-запросов соответствует применению правил при минимальной ширине 500px?",
    answers: ["@media (width:500px) { … }", "правильного ответа нет", "@media (max-width:500px) { … }", "@media (min-width:500px) { … }"],
    correctAnswer: 3,
  },
  {
    text: "4. Ширина родительского элемента 1000px, высота 700px. У дочернего записано свойство padding-top: 20%, чему равен верхний отступ в пикселях?",
    answers: ["200px", "70px", "140px", "100px"],
    correctAnswer: 0,
  },
  {
    text: "5. Какой порядок следования отступов у свойства padding: 10px 20px 30px 40px",
    answers: [
      "сверху, слева, снизу, справа",
      "сверху, справа, снизу, слева",
      "справу, снизу, слева, сверху",
      "сверху, слева, справа, снизу",
    ],
    correctAnswer: 1,
  },
  {
    text: "6. Ширина родительского элемента 1000px, высота 700px. У дочернего записано свойство margin-top: 20%, чему равен верхний отступ в пикселях?",
    answers: ["100px", "140px", "200px", "70px"],
    correctAnswer: 2,
  },
  {
    text: "7. Единица измерения vmax ообозначает",
    answers: [
      "такой величины нет",
      "бОльшую сторону видимой части экрана",
      "100% высоты видимой части экрана",
      "100% ширины видимой части экрана",
    ],
    correctAnswer: 1,
  },
  {
    text: "8. Что позволяет указать тег title?",
    answers: ["div", ".div", "#div", ".span"],
    correctAnswer: 0,
  },
  {
    text: "9. Какие из CSS-селекторов являются селекторами по атрибуту class HTML-элемента?",
    answers: [".div", "div", "span", "#div"],
    correctAnswer: 0,
  },
  {
    text: "10. Какой из селекторов выберет все HTML-элементы div с атрибутом title начинающимся со значения «bar»?",
    answers: ["div[title='bar']", "div[title^='bar']", "div[title$='bar']", "div[title*='bar']"],
    correctAnswer: 1,
  },
];

var yourAns = new Array();
var score = 0;

function Engine(question, answer) {
  yourAns[question] = answer;
}

function Score() {
  var answerText = "";
  for (var i = 0; i < yourAns.length; ++i) {
    var num = i + 1;
    if (yourAns[i] != questions[i].correctAnswer) {
    } else {
      ++score;
    }
  }

  answerText = answerText + "\nВсего правильных ответов: " + score + "\n" + "Вы молодец!";
  alert(answerText);
  localStorage.removeItem("css-test");
  localStorage.setItem("css-test", score);
  yourAns = [];
  score = 0;
  clearForm("quiz");
}

function clearForm(name) {
  var f = document.forms[name];
  for (var i = 0; i < f.elements.length; ++i) {
    if (f.elements[i].checked) f.elements[i].checked = false;
  }
}
