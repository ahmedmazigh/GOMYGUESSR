window.onload = (event) => {
  let card = document.querySelectorAll(".card-container");
  card[0].classList.add("anim-transition");
  card[1].classList.add("anim-transition");
  card[2].classList.add("anim-transition");
  card[0].classList.add("hidden");
  card[1].classList.add("hidden");
  card[2].classList.add("hidden");
  card[0].style = "animation-delay: 0s";
  card[1].style = "animation-delay: 200ms";
  card[2].style = "animation-delay: 400ms";
  card[0].addEventListener("animationend", unhide);
  card[1].addEventListener("animationend", unhide);
  card[2].addEventListener("animationend", unhide);
};

function unhide() {
  this.classList.remove("hidden");
}
