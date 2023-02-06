//
// Copyright (C) 2016-2019, Maxim Lihachev, <envrm@yandex.ru>
//
// This program is free software: you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
// more details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.
//

//------------------------------------------------------------------------------

"use strict";

//------------------------------------------------------------------------------

//Иерархия элементов на странице
var HTML = {
  container: "",
  _select: function (element) {
    return document.getElementById(this.container + "-" + element);
  },
  input: function () {
    return this._select("word");
  },
  button: function () {
    return this._select("convert");
  },
  dict: function () {
    return this._select("dict");
  },
  content: function () {
    return this._select("content");
  },
  full: function () {
    return this._select("full");
  },
  help: function () {
    return this._select("help");
  },
  image: function () {
    return this._select("image");
  },
};

//Вывод справки с примерами использования
function show_help() {
  HTML.vis(HTML.help());
  HTML.vis(HTML.content());
}

//Смена названия по клику
function swap_title(id) {
  var e = document.getElementById(id);
  if (e.style.display == "inline") {
    e.style.display = "none";
  } else {
    e.style.display = "inline";
  }
}

HTML.vis = function (e, v) {
  if (v !== undefined) {
    e.style.visibility = v;
  } else {
    e.style.visibility = e.style.visibility === "visible" ? "hidden" : "visible";
  }
};

//Инициализация документа
HTML.init = function (root) {
  //Задание базового id для всех элементов
  this.container = root;

  //Конвертирование по нажатию <Enter>
  this.input().addEventListener("keyup", (event) => {
    event.preventDefault();
    event.keyCode == 13 && tr();
  });

  //Конвертирование по нажатию кнопки
  this.button().onclick = () => tr();
};

//------------------------------------------------------------------------------

FEM.words.convert = function (string) {
  for (var fem_w in this) {
    string = string.replace(new RegExp("(^|\\s)+" + fem_w, "ig"), "$1" + this[fem_w]).replace(/(.)/, (s) => s.toUpperCase());
  }
  return string;
};

//------------------------------------------------------------------------------

//Первый элемент списка - окончание (в виде регулярного выражения)
let ending = (tuple) => new RegExp("^.*" + tuple[0] + "$", "i");

//Второй элемент списка - смещение
let offset = (tuple) => tuple[1];

//Случайный элемент списка
let random_word = (wordlist) => wordlist[Math.floor(Math.random() * wordlist.length)];

//Оборачивание в <span> с указанным классом
let html_wrap = (str, cl) => `${str}`;

//Цветовое выделение текста
let css_end = (ending) => html_wrap(ending, "ending");

//Символ gender gap
let css_gender_gap = html_wrap("");

//------------------------------------------------------------------------------

//Конструирование феминитива с gender_gap
function construct_feminitive(stem, ending, gap) {
  return gap ? stem + css_gender_gap + css_end(ending) : stem + ending;
}

//Длина шаблона, подпадающего под регулярное выражение r
function regex_len(r) {
  return r.replace(/\[[^\[\]]*\]/g, "x").length;
}

//Создание феминитива
function make_feminitives(word, visibleGaps) {
  //Обрабатываем только слова длиннее трёх символов
  if (word.length < 3) return [word, word];

  if (FEM.words[word] != undefined) {
    let wrd = visibleGaps ? FEM.words[word] : FEM.words[word].replace("_", "");

    return [wrd, wrd];
  }

  var stem = ""; //Основа слова
  // var current_ending = word.slice(-2); //Текущее окончание
  var current_endings = [word.slice(-4), word.slice(-3), word.slice(-2)];
  var feminitives = []; //Массив феминитивов
  var femicards = []; //Массив феминитивов для карточки

  var found = false;

  current_endings.forEach((current_ending) => {
    if (!found) {
      for (let fem_ending in FEM.endings) {
        FEM.endings[fem_ending].forEach((end) => {
          if (regex_len(end[0]) === current_ending.length && ending(end).test(current_ending)) {
            //Удаление лишних букв из основы
            stem = offset(end) === 0 ? word : word.slice(0, -offset(end));

            let rule = fem_ending.split("+");

            let prefix, all_fem_endings;

            if (rule.length > 1) {
              prefix = rule[0];
              all_fem_endings = rule[1];
            } else {
              prefix = "";
              all_fem_endings = fem_ending;
            }

            all_fem_endings.split("|").forEach((e) => {
              //Добавление фем-варианта слова в массив
              feminitives.push(construct_feminitive(stem + prefix, e, 1, visibleGaps));
              femicards.push(construct_feminitive(stem + prefix, e, 0, visibleGaps));
            });

            found = true;
          }
        });
      }
    }
  });

  //При отсутствии феминитивов считать корректным исходное слово
  return [FEM.random_word(femicards) || word, feminitives];
}

//Создание феминитива
function make_feminitives_old(word) {
  //Обрабатываем только слова длиннее трёх символов
  if (word.length < 3) return [word, word];

  var stem = ""; //Основа слова
  var current_ending = word.slice(-2); //Текущее окончание
  var feminitives = []; //Массив феминитивов
  var femicards = []; //Массив феминитивов для карточки

  for (let fem_ending in FEM.endings) {
    FEM.endings[fem_ending].forEach((end) => {
      if (ending(end).test(current_ending)) {
        //Удаление лишних букв из основы
        stem = offset(end) === 0 ? word : word.slice(0, -offset(end));

        //Добавление фем-варианта слова в массив
        feminitives.push(construct_feminitive(stem, fem_ending, 1));
        femicards.push(construct_feminitive(stem, fem_ending, 0));
      }
    });
  }
  //При отсутствии феминитивов считать корректным исходное слово
  return [random_word(femicards) || word, feminitives];
}

//Поиск и феминизация дефиниции в викистранице
function parseWikiPage(page) {
  var wiki = page.split("\n");
  var definition = "";

  wiki.some((line, n) => {
    if (line.match(/^.*==== Значение ====.*$/)) {
      let definition_line = n + 1;

      //После заголовка возможна пустая строка или помета (например, {{воен.}})
      if (wiki[n + 1].trim().length === 0 || wiki[n + 1].trim().match(/^{{[^}]*}}$/)) {
        definition_line = n + 2;
      }

      definition = wiki[definition_line]
        //# дефиниция
        .replace(/^# ?/, "")

        //[[1]]
        .replace(/\[{2}([^\]|]*)\]{2}/g, "$1")

        //[[1|2]]
        .replace(/\[{2}[^|]*\|([^\]]*)\]{2}/g, "$1")

        //{{сокр.|слово<!--ком.-->.*$
        .replace(/\{{2}[а-яА-Я]+\.[^{}]*\|[^{}]*\}{2}\s*/g, "")

        //~ : возможна вложенность
        .replace(/\{{2}[а-яА-Я]+\.[^{}]*\|[^{}]*\}{2}\s*/g, "")

        //{{-}}$
        .replace(/\{\{-\}\}/g, "")

        //{{помета|...}}$
        .replace(/\{{2}помета\s*\|[^}]+\}{2}/g, "")

        //{{действие|(глагол)#...lang=LC}}$
        .replace(/\{{2}(действие)\s*\|([^#|]+)([#|].*lang=\w{2})?\}{2}/g, "$1 «$2»")

        //{{пример/семантика|.*$ или {{пример/семантика}}
        .replace(/\{{2}(пример|семантика)(\}{2}|\s*\|.*$)/g, "")

        //{{1|слово<!--комментарий-->.*$
        .replace(/\{{2}[^{}]*\|(lang=\w{2})?/g, "")

        //{{1}}
        .replace(/\{{2}([^\]|]*)\}{2}/g, "$1")

        //'''ударение'''
        .replace(/'''([^']*)'''/g, "«$1»")

        //<!--комментарий-->
        .replace(/<!--[^>]*-->/g, "")

        //}}
        .replace(/\}{2}/g, "")

        //ссылки [n]
        .replace(/\[[0-9]{1,}\]/g, "")

        //^,; ...
        .replace(/^\s*[,;]\s*/g, "")

        //{{.*$
        .replace(/\{{2}[^}]*$/g, "")

        //HTML
        .replace(/(<([^>]+)>)/gi, "")

        //Неразрывный пробел
        .replace(/&nbsp;/g, " ")

        //Точка в конце предложения
        .replace(/ ?$/, ".")

        .replace(/'/g, "");

      return true;
    }
  });

  //Разделение дефиниции на массив слов и знаков препинания и феминизация слов
  // var tokens =  definition.match(/[\wа-яА-Яё]+|\d+| +|[.;,]|[^ \w\d\t.;,]+/ig) || [];
  // console.log(tokens);

  //Замена местоимений, предлогов и проч.
  // HTML.full().innerHTML = FEM.words.convert(tokens.map(w => make_feminitives(w)[0]).join(""));

  //DEBUG
  let defenitionBlock = document.querySelector(".fem-defenition-text");
  defenitionBlock.innerHTML = definition;
}

//Запрос значения слова в викисловаре
function get_wiktionary(term) {
  var cors_url = "https://api.allorigins.win/get?url=";
  var wiki_url = cors_url + encodeURIComponent("https://ru.wiktionary.org/w/index.php?action=raw&title=" + term);

  var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      parseWikiPage(JSON.parse(xmlhttp.responseText).contents);
    }
  };

  xmlhttp.open("GET", wiki_url, true);
  xmlhttp.send();
}

//Создание и вывод феминитива
function tr(word) {
  //Исходное слово
  var wd =
    word ||
    HTML.input()
      .value.trim()
      .toLowerCase()
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split(" ")[0];
  var feminitives = "";

  //Вывод информации
  if (!wd) {
    show_help();

    return;
  } else if (FEM.exceptions.contains(wd)) {
    HTML.full().innerHTML = FEM.exceptions.definition(wd);
    feminitives = FEM.exceptions.feminitives(wd);
  } else {
    get_wiktionary(wd);
    feminitives = make_feminitives(wd);
  }
  let femCardsWrapper = document.querySelector(".fem-blocks-wrappper");
  femCardsWrapper.innerHTML = "";
  let ourRandomFemBlock = document.querySelector(".who-i");

  // Вот тут слэш
  // Список феменитивов
  let femArr = feminitives[1];
  let weHaveNoFem = document.querySelector(".if-we-have-no-fem-text");

  if (femArr.length == 0) {
    weHaveNoFem.innerHTML = "Это слово и так прекрасно. Оставим его как есть.";
  } else {
    weHaveNoFem.innerHTML = "";
    for (let i = 0; i < femArr.length; i++) {
      var femCard = document.createElement("div");
      femCard.classList.add("fem-block-card");
      if (femArr[i] == feminitives[0]) {
        femCard.classList.add("active-fem-card");
      }
      femCard.textContent = femArr[i];
      femCardsWrapper.appendChild(femCard);
    }
  }
  // Случайное слово
  ourRandomFemBlock.innerHTML = feminitives[0];
}

//Инициализация с разбором адресной строки
function init(container) {
  HTML.init(container);
}

let firstClick = document.querySelector(".click-first");
firstClick.addEventListener("click", function () {
  let ourInput = document.querySelector(".fem-input");
  ourInput.value = "Автор";
  event.preventDefault();
  document.getElementById("definition-convert").click();
});

let secondClick = document.querySelector(".click-second");
secondClick.addEventListener("click", function () {
  let ourInput = document.querySelector(".fem-input");
  ourInput.value = "Врач";
  event.preventDefault();
  document.getElementById("definition-convert").click();
});

let firstClickMobile = document.querySelector(".click-first-mobile");
firstClickMobile.addEventListener("click", function () {
  let ourInput = document.querySelector(".fem-input");
  ourInput.value = "Автор";
  event.preventDefault();
  document.getElementById("definition-convert").click();
});

let secondClickMobile = document.querySelector(".click-second-mobile");
secondClickMobile.addEventListener("click", function () {
  let ourInput = document.querySelector(".fem-input");
  ourInput.value = "Врач";
  event.preventDefault();
  document.getElementById("definition-convert").click();
});
