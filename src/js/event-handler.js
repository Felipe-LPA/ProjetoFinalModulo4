import { debounce } from "./aux-function.js";
import { search } from "./index.js";
import { doResultReset } from "./html-handler.js";

const searchInput = document.querySelector(".searchInput");
searchInput.addEventListener("input", (e) => {
  debounce(e, search, 2000);
});

document.addEventListener("click", (e) => {
  const resetbuttons = e.target.classList;
  if (
    !(resetbuttons.contains("reset-button") ||
    resetbuttons.contains("span-reset"))
  ) return
  doResultReset()
});
