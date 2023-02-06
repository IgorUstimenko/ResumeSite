let htmlLine = document.querySelector(".graph-line3");
let cssLine = document.querySelector(".graph-line2");
let jsLine = document.querySelector(".graph-line1");

if (localStorage.getItem("name") == null) {
  let ourName = prompt("Введите ваше имя!");
  localStorage.setItem("name", ourName);
}

var questions = [
  {
    text: "1. С помощью какого атрибута задаётся ширина поля textarea?",
    answers: ["rows", "size", "cols", "width"],
    correctAnswer: 2, // нумерация ответов с нуля!
  },
  {
    text: "2. С помощью какого атрибута объединяются ячейки таблицы по вертикали?",
    answers: ["colspan", "unity", "rowspan", "union"],
    correctAnswer: 2,
  },
  {
    text: "3. Каким является следующий адрес ссылки: pages/page2.html",
    answers: ["Абсолютным", "Относительным"],
    correctAnswer: 1,
  },
  {
    text: "4. Как оформляется комментарий в HTML?",
    answers: ["другое", "/* комментарий */", "// комментарий"],
    correctAnswer: 0,
  },
  {
    text: "5. Как сделать всплывающую подсказку при наведении на ссылку?",
    answers: [
      "<а title='Подсказка' href='#'>Ссылка</а>",
      "<а alt='Подсказка' href='#'>Ссылка</а>",
      "<а caption='Подсказка' href='#'>Ссылка</а>",
    ],
    correctAnswer: 0,
  },
  {
    text: "6. Какой тег нужно использовать для названия таблицы?",
    answers: ["caption", "name", "head", "body"],
    correctAnswer: 0,
  },
  {
    text: "7. Как правильно создать вложенный список (когда один список помещается внутри другого)?",
    answers: [
      "Внутрь тега '<u|>' поместить тег '<|i>', внутри него снова создать тег '<u|>', а внутри него '<|i'",
      "Внутри тега '<u|>' поместить ещё один тег '<u|>', а внутри него добавлять теги '<|i>/'",
    ],
    correctAnswer: 0,
  },
  {
    text: "8. Что позволяет указать тег title?",
    answers: [
      "Название таблицы",
      "Название маркированного списка",
      "Название страницы, которое также будет отображено в поисковиках",
      "Заголовок первого уровня на странице",
    ],
    correctAnswer: 2,
  },
  {
    text: "9. Какое значение атрибута type указывается для поля-галочки в форме?",
    answers: ["checkbox", "name", "id", "radio"],
    correctAnswer: 0,
  },
  {
    text: "10. Как правильно оформить нумерованный список?",
    answers: [
      "Поместить внутрь тега <o|> теги <|i>, внутри которых написать текст",
      "Просто написать текст в формате: число, точка, пробел, текст, перенос строки.",
      "Разделить каждую строку с помощью <бr>, на новой строке добавить число, точку и пробел",
    ],
    correctAnswer: 0,
  },
  {
    text: "11. С помощью какого свойства можно сделать отступы внутри ячейки в таблице?",
    answers: ["case", "space", "padding", "margin"],
    correctAnswer: 2,
  },
  {
    text: "12. Как вставить картинку в HTML?",
    answers: [
      "<image>http://site.com/image.jpg</image>",
      "<img>http://site.com/image.jpg</img>",
      "<|mg src='http://site.com/image.jpg'>",
      "<|mge source='http://site.com/image.jpg'>",
    ],
    correctAnswer: 2,
  },
  {
    text: "13. Каким является следующий адрес ссылки: ../page2.html",
    answers: ["Абсолютным", "Относительным"],
    correctAnswer: 0,
  },
  {
    text: "14. Как выделить текст курсивом?",
    answers: ["<с>курсив</с>", "<hр>курсив</hр>", "<р>курсив</р>", "<еm>курсив</еm>"],
    correctAnswer: 3,
  },
  {
    text: "15. С помощью какого свойства таблицы определяются её границы?",
    answers: ["gran", "width", "property", "border"],
    correctAnswer: 3,
  },
  {
    text: "16. С помощью какого тега создаются поля формы?",
    answers: ["form", "parameter", "input", "field"],
    correctAnswer: 2,
  },

  {
    text: "17. С помощью какого атрибута объединяются ячейки таблицы по горизонтали?",
    answers: ["colspan", "union", "rowspan", "unity"],
    correctAnswer: 0,
  },

  {
    text: "18. Каким является следующий адрес ссылки: ./pages/page2.html",
    answers: ["Абсолютным", "Относительным"],
    correctAnswer: 0,
  },

  {
    text: "19. Какое число заголовков первого уровня считается допустимым?",
    answers: ["3", "2", "1", "4"],
    correctAnswer: 2,
  },

  {
    text: "20. Какую кодировку следует использовать на сайте?",
    answers: ["WINSOWS-1251", "UTF-32", "UTF-16", "UTF-8"],
    correctAnswer: 3,
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
  localStorage.removeItem("html-test");
  localStorage.setItem("html-test", score);
  let scoreBlock = document.querySelector(".score-block");
  scoreBlock.textContent = localStorage.setItem("html-test", score);
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

let jsScore = Number(localStorage.getItem("js-test")) * 10;
let cssScore = Number(localStorage.getItem("css-test")) * 10;
let htmlScore = Number(localStorage.getItem("html-test")) * 5;

let htmlLevel = document.querySelector(".html-level");
let cssLevel = document.querySelector(".css-level");
let jsLevel = document.querySelector(".js-level");

let firstHtmlLink = document.querySelector(".first-html-link");
let secondHtmlLink = document.querySelector(".second-html-link");

let firstcssLink = document.querySelector(".first-css-link");
let secondcssLink = document.querySelector(".second-css-link");

let firstjsLink = document.querySelector(".first-js-link");
let secondjsLink = document.querySelector(".second-js-link");

if (jsScore <= 40) {
  jsLevel.textContent = "Новичёк";
  firstjsLink.setAttribute("href", "https://www.youtube.com/watch?v=HuPK6AwgzJc");
  secondjsLink.setAttribute("href", "https://www.youtube.com/watch?v=uOeFpp872MY");
} else if (40 < jsScore && jsScore <= 80) {
  jsLevel.textContent = "Продвинутый";
  firstjsLink.setAttribute("href", "https://www.youtube.com/watch?v=Bluxbh9CaQ0");
  secondjsLink.setAttribute("href", "https://www.youtube.com/watch?v=003BKwPBpd4");
} else if (80 < jsScore) {
  jsLevel.textContent = "Профи";
  firstjsLink.setAttribute("href", "https://www.youtube.com/watch?v=NErrGZ64OdE");
  secondjsLink.setAttribute("href", "https://www.youtube.com/watch?v=tAgVINdc_o0");
}

if (cssScore <= 40) {
  cssLevel.textContent = "Новичёк";
  firstcssLink.setAttribute("href", "https://www.youtube.com/watch?v=SpCUuyZZTp8&t=3s");
  secondcssLink.setAttribute("href", "https://www.youtube.com/watch?v=CvEttNvty0U");
} else if (40 < cssScore && cssScore <= 80) {
  cssLevel.textContent = "Продвинутый";
  firstcssLink.setAttribute("href", "https://www.youtube.com/watch?v=1X8FNuy32ZM");
  secondcssLink.setAttribute("href", "https://www.youtube.com/watch?v=iPV5GKeHyV4");
} else if (80 < cssScore) {
  cssLevel.textContent = "Профи";
  firstcssLink.setAttribute("href", "https://www.youtube.com/watch?v=blbPjGK3_cY");
  secondcssLink.setAttribute("href", "https://www.youtube.com/watch?v=91k_HS1mBIk");
}

if (htmlScore <= 40) {
  htmlLevel.textContent = "Новичёк";
  firstHtmlLink.setAttribute("href", "https://www.youtube.com/watch?v=4jYYHaTwWvY");
  secondHtmlLink.setAttribute("href", "https://www.youtube.com/watch?v=bWNmJqgri4Q");
} else if (40 < htmlScore && htmlScore <= 80) {
  htmlLevel.textContent = "Продвинутый";
  firstHtmlLink.setAttribute("href", "https://www.youtube.com/watch?v=91k_HS1mBIk");
  secondHtmlLink.setAttribute("href", "https://www.youtube.com/watch?v=_J6hMLsscOo");
} else if (80 < htmlScore) {
  htmlLevel.textContent = "Профи";
  firstHtmlLink.setAttribute("href", "https://www.youtube.com/watch?v=4YRG6cMAASI");
  secondHtmlLink.setAttribute("href", "https://www.youtube.com/watch?v=MY6gQDiJN2Q");
}
