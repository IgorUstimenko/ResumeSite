let htmlLine = document.querySelector(".graph-line3");
let cssLine = document.querySelector(".graph-line2");
let jsLine = document.querySelector(".graph-line1");

if (localStorage.getItem("name") == null) {
  let ourName = prompt("Введите ваше имя!");
  localStorage.setItem("name", ourName);
}

var questions = [
  {
    text: "1. Какая переменная записана неверно?",
    answers: ['var num = "STRING";', "var isDone = 0;", "var b = false;", "var number = 12,5;"],
    correctAnswer: 3, // нумерация ответов с нуля!
  },
  {
    text: "2. Какие значения можно хранить в переменных?",
    answers: [
      "Только числа и строки",
      "Строки, числа с точкой и простые числа",
      "строки, числа с точкой, простые числа и булевые выражения",
    ],
    correctAnswer: 2,
  },
  {
    text: "3. В чем отличие между локальной и глобальной переменной?",
    answers: [
      "Отличий нет",
      "Глобальные видны повсюду, локальные только в функциях",
      "Локальные видны повсюду, глобальные только в функциях",
      "Локальные можно переопределять, глобальные нельзя",
    ],
    correctAnswer: 1,
  },
  {
    text: "4. Какие циклы есть в языке JavaScript?",
    answers: [
      "for, forMap, foreach, while",
      "for, forMap, foreach, while, do while",
      "for, while, do while, foreach",
      "for, while, do while",
    ],
    correctAnswer: 3,
  },
  {
    text: "5. Что такое условный оператор?",
    answers: [
      "Конструкция, что выполняет код несколько раз",
      "Конструкция для создания определенной переменной",
      "Оператор сравнения значений",
    ],
    correctAnswer: 2,
  },
  {
    text: "6. В чем разница между confirm и prompt?",
    answers: [
      "Они ничем не отличаются",
      "confirm вызывает диалоговое окно с полем для ввода, prompt - окно с подтверждением",
      "prompt вызывает диалоговое окно с полем для ввода, confirm - окно с подтверждением",
    ],
    correctAnswer: 2,
  },
  {
    text: "7. Какие функции выполняет JS?",
    answers: [
      "Выполняет работу с сервером",
      "Создает разметку на странице сайта",
      "Создает стилевое оформление сайта",
      "Отвечает за функции на стороне клиента",
    ],
    correctAnswer: 3,
  },
  {
    text: "Где верно указано имя переменной?",
    answers: ["var 2num;", "ver num;", "var num", "var num_1;"],
    correctAnswer: 3,
  },
  {
    text: "9. Где можно использовать JavaScript?",
    answers: ["Мобильные приложения", "Веб-приложения", "Серверные приложения", "Можно во всех перечисленных"],
    correctAnswer: 3,
  },
  {
    text: "10. Какая арифметическая операция приводит к ошибке в javascript?",
    answers: ["Деление на ноль", "Никакая из вышеперечисленных", "Корень из отрицательного числа", "Умножение числа на строку"],
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
  localStorage.removeItem("js-test");
  localStorage.setItem("js-test", score);
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
