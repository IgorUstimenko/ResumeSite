let femBtn = document.querySelector(".fem-btn");
let nonActiveBlock = document.querySelector(".non-active-block");
let activeBlock = document.querySelector(".active-block");
let femInput = document.querySelector(".fem-input");

femBtn.addEventListener("click", function () {
  if (femInput.value.length > 0) {
    nonActiveBlock.style.display = "none";
    activeBlock.style.display = "block";
  }
});

$(".fem-blocks-wrappper").on("click", ".fem-block-card", function () {
  let whoISpan = document.querySelector(".who-i");
  whoISpan.textContent = this.textContent;
  $(".fem-block-card").removeClass("active-fem-card");
  // this.addClass("active-fem-card");
  this.classList.add("active-fem-card");
});
