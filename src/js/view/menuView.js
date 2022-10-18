const navEl = document.querySelector(".container");
const btnNav = document.querySelector(".header__menu");
const btnNavtheme = document.querySelector(".dark-link");

///////////////////////////////////////////
//Mobile-menu
btnNav.addEventListener("click", function () {
  navEl.classList.toggle("nav-open");
});

///////////////////////////////////////////
//Dark-theme
btnNavtheme.onclick = () => {
  document.body.classList.toggle("lightmode");
};
