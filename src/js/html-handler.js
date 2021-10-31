import { translateAmenities } from "./aux-function.js";
import { dicionaryAmenities } from "./dicionaries-data.js";
export const doResultReset = () => {
  const buttonResetAsideEl = document.querySelector('.reset-city-state');
  const pathCityStateEl = document.querySelector('.path-city-state');
  const searchResultEl = document.querySelector('#search-result');
  buttonResetAsideEl.innerHTML = ''
  pathCityStateEl.innerHTML = ''
  searchResultEl.innerHTML = ''
  console.log(buttonResetAsideEl, pathCityStateEl, searchResultEl)
  // .innerHTML = "";
};
export const clearInputSearch = () => {
  const searchInputEl = document.querySelector('.searchInput')
  searchInputEl.value = "";
}
const createElementWithText = (element, text) => {
  // console.log(element, text)
  const elementEl = document.createElement(element);
  // console.log(elementEl)
  elementEl.innerText = text;
  return elementEl;
};

export const setError = () => {
  const searchResultEl = document.querySelector("#search-result");
  searchResultEl.innerHTML = "";
  const arrWithErrorMsg = [
    "OOOOPS!",
    "ALGO DEU ERRADO NA SUA BUSCA.",
    "status 500",
    "POR FAVOR, TENTE NOVAMENTE.",
  ];
  const msg = arrWithErrorMsg.map((msg) => {
    const element = createElementWithText("h2", msg);
    if (msg.includes("status")) element.classList.add("statusErrorMsg");
    element.classList.add("errorMsgFormat");
    return element;
  });
  const articleEl = document.createElement("article");
  articleEl.append(...msg);
  searchResultEl.append(articleEl);
};

export const buildResetButtonAside = ({ city, state }) => {
  const resetDivButtonAside = document.querySelector(".reset-city-state");
  resetDivButtonAside.innerHTML = "";
  const resetButtonEl = createResetButton(city, state);
  resetButtonEl.classList.add("reset-button");
  resetDivButtonAside.append(resetButtonEl);
};

export const buildlistProperties = (
  arrformatedObjProperties,
  amountProperties,
  cityAndState
) => {
  const searchResultEl = document.querySelector("#search-result");
  searchResultEl.innerHTML = '';
  const titleListProperties = setTitleListProperties(
    amountProperties,
    cityAndState
  );
  const listProperties = setListProperties(arrformatedObjProperties);
  console.log(listProperties);
  searchResultEl.append(titleListProperties);
  listProperties.map((propertyElement) => {
    searchResultEl.append(propertyElement);
  });
  console.log(arrformatedObjProperties, amountProperties);
};
const setTitleListProperties = (amountProperties, { city, state }) => {
  const articleEl = document.createElement("article");
  const h1El = document.createElement("h1");
  const amountEL = createElementWithText("span", `${amountProperties}`);
  amountEL.classList.add("fw-bold");
  h1El.append(amountEL, ` imóveis à venda em ${city} - ${state}`);
  h1El.classList.add("title-list-properties");
  // console.log(h1El)
  const resetButton = createResetButton(city, state);
  resetButton.classList.add("reset-Button-Title-list", "reset-button");
  articleEl.append(h1El, resetButton);
  articleEl.classList.add("first-article-list");
  return articleEl;
};
const createResetButton = (city, state) => {
  const spanEl = createElementWithText("span", `${city} - ${state}`);
  spanEl.classList.add('span-reset')
  const divEl = document.createElement("div");
  divEl.append(spanEl);
  return divEl;
};

const setListProperties = (arrformatedObjProperties) => {
  return arrformatedObjProperties.map((formatedObjProperty) => {
    // ancora para cada elemento
    const aEl = document.createElement("a");
    aEl.setAttribute("href", "#");
    //  article para acoplar cada box de cada propriedade
    const articleEl = document.createElement("article");
    articleEl.classList.add("property-box");
    // div que recebe a imagem da propriedade
    const imgEl = createImgBox(formatedObjProperty.imgUrl);
    // div que recebe as parte de informações da propriedade
    const infoEl = setInfoProperty(formatedObjProperty);
    aEl.append(imgEl, infoEl);
    articleEl.append(aEl);
    return articleEl;
  });
};
const createImgBox = (imgUrl) => {
  const divEl = document.createElement("div");
  const imgEl = document.createElement("img");
  imgEl.src = imgUrl;
  divEl.append(imgEl);
  divEl.classList.add("img-box");
  return divEl;
};

const setInfoProperty = ({ address, name, area, amenities, pricingInfos }) => {
  const divEl = document.createElement("div");
  const addressEl = createElementWithText("p", address);
  const nameEl = createElementWithText("p", name);
  const areaEl = createElementWithText("p", area);
  const amenitiesEl = setAmenities(amenities);
  const pricingInfosEl = setPriceInfosEl(pricingInfos);
  const contactButtonsEl = setContactButtons();
  divEl.classList.add("property-info");
  divEl.append(
    addressEl,
    nameEl,
    areaEl,
    amenitiesEl,
    pricingInfosEl,
    contactButtonsEl
  );
  return divEl;
};

const setAmenities = (amenities) => {
  const divEl = document.createElement("div");
  amenities.forEach((amenity) => {
    const translatedAmenity = translateAmenities(amenity, dicionaryAmenities);
    const divAmenityEl = createElementWithText("div", translatedAmenity);
    // console.log(divAmenityEl, translatedAmenity)
    divAmenityEl.classList.add("amenities");
    // divAmenityEl.innerText = amenity
    divEl.append(divAmenityEl);
  });
  divEl.classList.add("amenities-box");
  return divEl;
};

const setPriceInfosEl = ({ price, monthlyCondoFee }) => {
  const divEl = document.createElement("div");
  divEl.classList.add("price-infos");
  const priceFormated = new Intl.NumberFormat("pt-BR").format(price);
  const priceEl = createElementWithText("p", `R$ ${priceFormated}`);
  if (monthlyCondoFee) {
    // caso exista condominio formata o mesmo e cria o span com o valor que
    // separado para aplicar o estilo
    const monthlyCondoFeeFormated = new Intl.NumberFormat("pt-BR").format(
      monthlyCondoFee
    );
    const spanEl = createElementWithText(
      "span",
      `R$ ${monthlyCondoFeeFormated}`
    );
    const monthlyCondoFeeEl = document.createElement("p");
    monthlyCondoFeeEl.append("Condomínio: ", spanEl);
    divEl.append(priceEl, monthlyCondoFeeEl);
    return divEl;
  }
  divEl.append(priceEl);
  return divEl;
};

const setContactButtons = () => {
  const teletoneEl = createContactButtons("TELEFONE");
  const msgEl = createContactButtons("ENVIAR MENSSAGEM");
  const divEl = document.createElement("div");
  divEl.classList.add("contact-box");
  divEl.append(teletoneEl, msgEl);
  return divEl;
};
const createContactButtons = (text) => {
  const buttonEl = createElementWithText("button", text);
  buttonEl.classList.add("contact-btn");
  return buttonEl;
};

export const buildPathResult = ({ city, state }) => {
  const pathCityStateEl = document.querySelector(".path-city-state");
  pathCityStateEl.innerHTML = "";
  const ulEl = document.createElement("ul");
  const homeEl = liElements("Viva Real");
  const propertyTypeEl = liElements("Venda");
  const stateEl = liElements(`${state}`);
  const cityEl = liElements(`imóveis à venda em ${city}`);
  ulEl.append(homeEl, propertyTypeEl, stateEl, cityEl);
  pathCityStateEl.append(ulEl);
};
const liElements = (text) => {
  const aEl = document.createElement("a");
  aEl.setAttribute("href", "#");
  aEl.append(text);
  const liEl = document.createElement("li");
  liEl.append(aEl);
  return liEl;
};
