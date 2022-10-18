const navEl = document.querySelector(".container");
const btnNav = document.querySelector(".header__menu");
const menuIcon = document.querySelector(".header__menu--icon");
const btnNavtheme = document.querySelector(".dark-link");
const btnNavicon = document.querySelector(".dark-icon");
const logo = document.querySelector(".header__logo");

///////////////////////////////////////////
//Mobile-menu
btnNav.addEventListener("click", function () {
  navEl.classList.toggle("nav-open");
});

///////////////////////////////////////////
//Dark-theme
btnNavtheme.onclick = () => {
  document.body.classList.toggle("lightmode");
  if (document.body.classList.contains("lightmode")) {
    btnNavicon.setAttribute("href", "/icons.21bad73c.svg#icon-moon");
    logo.setAttribute("src", "/logo.726d37a8.png");
  } else {
    btnNavicon.setAttribute("href", "/icons.21bad73c.svg#icon-sun");
    logo.setAttribute("src", "/logo-1.80b61a37.png");
  }
};
