// Кнопка сохранить
let saveBtn = document.getElementById('saveBtn');
// Кнопка отменть
let cancelBtn = document.getElementById('cancelBtn');
// Обертка всех тасков первой колонки
let toDoColumnTasksWrapper = document.getElementById('to-do-column-tasks-wrapper');
// Обертка всех тасков второй колонки
let doTodayColumnTasksWrapper = document.getElementById('do-today-column-tasks-wrapper');
// Обертка всех тасков третьей колонки
let inProgressColumnTaskWrppaer = document.getElementById('in-progress-column-tasks-wrapper');
// Обертка всех тасков четвертой колонки
let doneColumnTaskWrapper = document.getElementById('done-column-tasks-wrapper');
let columsArr = [toDoColumnTasksWrapper, doTodayColumnTasksWrapper, inProgressColumnTaskWrppaer, doneColumnTaskWrapper];
// Название таска
let taskName = document.getElementById('task-name-input');
// Описание таска
let taskText = document.getElementById('task-text-input');
// Датапикер
let taskDate = document.getElementById('datepicker');

// Отслеживаем на какой плюс мы нажали, в какой блок добавлять новый таск
let plusesArr = document.querySelectorAll('.column-header-plus-wrapper');
let id;
plusesArr.forEach(function (item) {
    item.addEventListener('click', function () {
        $('#ex1').modal();
        id = item.id;
    });
});



var my_div = newDiv = null;

function addTask() {

    // Сама обертка таска
    var newDiv = document.createElement("div");
    newDiv.classList.add('column-task-wrapper');

    // Хедер
    var newHeader = document.createElement("div");
    newHeader.classList.add('column-task-header');

    // Название таска
    var newName = document.createElement("div");
    newName.classList.add('column-task-wrapper-name');
    newName.textContent = taskName.value;

    // Дата
    var newDate = document.createElement("div");
    newDate.classList.add('column-task-wrapper-date');
    newDate.textContent = taskDate.value;

    //Сам таск
    var newText = document.createElement("div");
    newText.classList.add('column-task-wrapper-text');
    newText.textContent = taskText.value;

    if (taskText.value.indexOf(' ') == -1) {
        newText.style.wordBreak = 'break-all';
    }

    // Генерирование на странице
    if (id == 'to-do-plus') {
        toDoColumnTasksWrapper.appendChild(newDiv);
    } else if (id == 'do-today-plus') {
        newDiv.classList.add('green-bg');
        doTodayColumnTasksWrapper.appendChild(newDiv);
    } else if (id == 'in-progress-plus') {
        newDiv.classList.add('orange-bg');
        inProgressColumnTaskWrppaer.appendChild(newDiv);
    } else if (id == 'done-plus') {
        newDiv.classList.add('red-bg');
        doneColumnTaskWrapper.appendChild(newDiv);
    }

    newDiv.appendChild(newHeader);
    newHeader.appendChild(newName);
    newHeader.appendChild(newDate);
    newDiv.appendChild(newText);

    // Обнуление инпутов после закрытия модального окна
    taskDate.value = '';
    taskText.value = '';
    taskName.value = '';
}

// Календарь
$(function () {
    $("#datepicker").datepicker();
});
$(function () {
    $("#redactDatepicker").datepicker();
});

//Локализация календаря
$('#datepicker').datepicker({
    dateFormat: "dd-mm-yy",
    minDate: new Date($('#hiddendelivdate').val()),
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
});
$('#redactDatepicker').datepicker({
    dateFormat: "dd-mm-yy",
    minDate: new Date($('#hiddendelivdate').val()),
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
});

// Обработчки событий на кнопки сохрнить и отменить
saveBtn.addEventListener('click', function () {
    // Валидация формы
    if (taskName.value == null || taskName.value == "") {
        alert('Введите название задачи');
    } else {
        addTask();
        $.modal.close();
    }
});

cancelBtn.addEventListener('click', function () {
    taskDate.value = '';
    taskText.value = '';
    taskName.value = '';
    $.modal.close();
});

let redactNameInput = document.getElementById('redact-task-name-input');
let redactTextInput = document.getElementById('redact-task-text-input');
let redactDataInput = document.getElementById('redactDatepicker');
let redactSaveBtn = document.getElementById('redactSaveBtn');
let redacDeleteBtn = document.getElementById('redacDeleteBtn');


// Чекбоксы
let toDoCheckBox = document.getElementById('toDoCheckBox');
let doTodayCheckBox = document.getElementById('doTodayCheckBox');
let inProgressCheckBox = document.getElementById('inProgressCheckBox');
let doneCheckBox = document.getElementById('doneCheckBox');
let checkBoxInputs = document.querySelectorAll('.check-box-input');

columsArr.forEach(function (item) {
    item.addEventListener('click', function (event) {

        // Чекбоксы
        let currentCheckBox;
        if (item.id == 'to-do-column-tasks-wrapper') {
            toDoCheckBox.checked = true;
            currentCheckBox = toDoCheckBox;
        } else if (item.id == 'do-today-column-tasks-wrapper') {
            doTodayCheckBox.checked = true;
            currentCheckBox = doTodayCheckBox;
        } else if (item.id == 'in-progress-column-tasks-wrapper') {
            inProgressCheckBox.checked = true;
            currentCheckBox = inProgressCheckBox;
        } else if (item.id == 'done-column-tasks-wrapper') {
            doneCheckBox.checked = true;
            currentCheckBox = doneCheckBox;
        }

        let newCheckBox;

        checkBoxInputs.forEach(function (item) {
            item.addEventListener('change', function () {
                newCheckBox = item;
            });
        });

        // Получаем родителя, в котором произошел клик
        let ourParent = event.target.parentNode;
        if (event.target.parentNode.className == 'column-task-header') {
            ourParent = ourParent.parentNode;
        }
        // Получаем колонку 
        let ourColumn = ourParent.parentNode;
        // Список элементов родителя
        let ourChildren = ourParent.childNodes;
        // Сам текст таска
        let ourTaskText = ourChildren[1].textContent;
        // Хедер таска
        let ourTaskHeader = ourChildren[0];
        // Дочерние элементы хедера таска
        let ourTaskHeaderChildren = ourTaskHeader.childNodes;
        // Дата таска
        let ourTaskData = ourTaskHeaderChildren[1].textContent;
        // Название таска
        let ourTaskName = ourTaskHeaderChildren[0].textContent;

        // Открытие модалки
        $('#RedactModal').modal();
        // Записываем текущие значения тасков в инпуты в модалке
        redactNameInput.value = ourTaskName;
        redactTextInput.value = ourTaskText;
        redactDataInput.value = ourTaskData;
        // Запись логов
        let logs = {};
        // Возможность редактировать
        redactSaveBtn.onclick = function () {
            logs.redactedTaskName = ourTaskHeaderChildren[0].textContent;
            logs.redactTextInput = ourChildren[1].textContent;
            logs.redactDataInput = ourTaskHeaderChildren[1].textContent;
            logs.ourTaskWrapper = ourParent;
            logs.ourColumn = ourColumn;
            console.log(logs);

            ourTaskHeaderChildren[0].textContent = redactNameInput.value;
            ourChildren[1].textContent = redactTextInput.value;
            ourTaskHeaderChildren[1].textContent = redactDataInput.value;


            $.modal.close();
            // Перенос по колонкам
            if (currentCheckBox != newCheckBox & newCheckBox != undefined) {
                newId = newCheckBox.id;
                oldId = currentCheckBox.id;
                if (newId == 'toDoCheckBox') {
                    ourParent.style.backgroundColor = '#c3ddff';
                    toDoColumnTasksWrapper.appendChild(ourParent);
                } else if (newId == 'doTodayCheckBox') {
                    ourParent.style.backgroundColor = '#c2f899';
                    doTodayColumnTasksWrapper.appendChild(ourParent);
                } else if (newId == 'inProgressCheckBox') {
                    ourParent.style.backgroundColor = '#ffc079';
                    inProgressColumnTaskWrppaer.appendChild(ourParent);
                } else if (newId == 'doneCheckBox') {
                    ourParent.style.backgroundColor = 'rgb(255, 97, 97)';
                    doneColumnTaskWrapper.appendChild(ourParent);
                }
            }
        };

        redacDeleteBtn.onclick = function () {
            ourColumn.removeChild(ourParent);
            $.modal.close();
        };

    });
});