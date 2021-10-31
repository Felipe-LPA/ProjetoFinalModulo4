import { debounce } from "./aux-function.js";
import { search } from "./index.js";
import { doResultReset } from "./html-handler.js";

const searchInput = document.querySelector(".searchInput");
searchInput.addEventListener("input", (e) => {
  debounce(e, search, 2000);
});

document.addEventListener("click", (e) => {
  const clickElClass = e.target.classList;
  // verifica se o click foi feito em um dos botoes de reset da pesquisa.
  if (
    clickElClass.contains("reset-button") ||
    clickElClass.contains("span-reset")
  )
    doResultReset();
  // verifica se o click foi no dropdown com os tipos de imoveis e faz o tratamento de
  // para mostrar e esconder o mesmo.
  else if (
    clickElClass.contains("link") ||
    e.target.closest(".select-dropdown")
  ) {
    let currentDropdown;
    if (clickElClass.contains("link")) {
      currentDropdown = e.target.closest(".select-dropdown");
      currentDropdown.classList.toggle("active");
    }
  } else {
    document.querySelectorAll(".select-dropdown.active").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});
