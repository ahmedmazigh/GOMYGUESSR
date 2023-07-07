window.onload = (event) => {
  let text_1 = document.querySelector(".welcome-container h1");
  let text_2 = document.querySelector(".welcome-container h2");
  let text_3 = document.querySelector(".welcome-container h3");
  let logo = document.querySelector(".welcome-container img");
  let container = document.querySelector(".welcome-container");
  let about = document.querySelector(".about-container");
  text_1.classList.add("anim-transit-right");
  text_2.classList.add("anim-transit-left");
  text_3.classList.add("anim-transit-right");
  about.classList.add("anim-blur");
  logo.classList.add("anim-blur");
  container.classList.add("anim-blur");
  container.style = "animation-duration: 1.5s";
  about.style = "animation-duration: 2s";
};
