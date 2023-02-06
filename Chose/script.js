let closeBtn = document.querySelector('.close');
let openBtn = document.querySelector('.burger-menu-img-wrapper');
let modalWindow = document.querySelector('.mobile-burger-menu');
let bodyWrapper = document.querySelector('html');
let modalHidden = document.querySelector('.modal-hidden');
openBtn.onclick = function() {
    modalWindow.style.display = 'block';
    bodyWrapper.style.overflowY = 'hidden';
};

closeBtn.onclick = function() {
    modalWindow.style.display = 'none';
    bodyWrapper.style.overflowY = 'initial';
};