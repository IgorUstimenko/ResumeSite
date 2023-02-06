//! Краткая справка по jQuery:
//? $("#first-stage-arrow-btn") - взятие элемента. Тоже самое, что document.querySelector('#first-stage-arrow-btn');
//? $("#stage-one").slideToggle(300); Jquery анимация на появление табов
//? $(this).toggleClass("active-btn"); включение/выключение класса у элемента при клике. Очень удобная штука

// Сначала идёт условие по проверке ширины экрана, если десктоп - слайдера нет, а также другая анимация на табы
if (window.innerWidth > 500) {
  // Тут класс твоей кнопки, на которую ты нажимаешь. Получаешь ее с помощью jQuery и делаешь анимацию разворота
  $("#first-stage-arrow-btn").click(function () {
    // Тут класс твоего стейджа, предварительно оно "display:none". При клике он "разворачивается"
    // Это специальная функция jQuery, чтобы красиво появлялся элемент
    $("#stage-one").slideToggle(300);
    $(this).toggleClass("active-btn");
  });

  $("#second-stage-arrow-btn").click(function () {
    $("#stage-two").slideToggle(300);
    $(this).toggleClass("active-btn");
  });

  $("#third-stage-arrow-btn").click(function () {
    $("#stage-three").slideToggle(300);
    $(this).toggleClass("active-btn");
  });
}

// Тут начинается условия для мобилки
else {
  $(".stage-substage-grid-wrapper").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    focusOnSelect: true,
    dotsClass: "my-dots",
  });

  $("#first-stage-arrow-btn").click(function () {
    // Тут ты даешь класс кнопке, чтобы она переворачивалась
    $(this).toggleClass("active-btn");
    // А тут уже я сделал анимацию появления стейджа через опасити и маржины, потому что через display: none,
    // как на десктопе, слайдер просто не хотел показывать первый слайд. Вроде смотрится прикольно
    $("#stage-one").toggleClass("opacity");
  });

  $("#second-stage-arrow-btn").click(function () {
    $(this).toggleClass("active-btn");
    $("#stage-two").toggleClass("opacity");
  });

  $("#third-stage-arrow-btn").click(function () {
    $(this).toggleClass("active-btn");
    $("#stage-three").toggleClass("opacity");
  });
}
