import { translateAmenities } from "./aux-function.js";
import { dicionaryAmenities } from "./dicionaries-data.js";
// apaga informacoes da pesquisa anterior
export const doResultReset = () => {
  const buttonResetAsideEl = document.querySelector(".reset-city-state");
  const pathCityStateEl = document.querySelector(".path-city-state");
  const searchResultEl = document.querySelector("#search-result");
  buttonResetAsideEl.innerHTML = "";
  pathCityStateEl.innerHTML = "";
  searchResultEl.innerHTML = "";
};
// limpa o imput de pesquisa
export const clearInputSearch = () => {
  const searchInputEl = document.querySelector(".searchInput");
  searchInputEl.value = "";
};
// cria um elemento html com o texto passado como parametro
const createElementWithText = (element, text) => {
  const elementEl = document.createElement(element);
  elementEl.innerText = text;
  return elementEl;
};

// renderiza a mensagem de erro
export const setError = () => {
  doResultReset();
  const searchResultEl = document.querySelector("#search-result");
  const arrWithErrorMsg = [
    "OOOOPS!",
    "ALGO DEU ERRADO NA SUA BUSCA.",
    "status 500",
    "POR FAVOR, TENTE NOVAMENTE.",
  ];
  const msg = arrWithErrorMsg.map((msg) => {
    const element = createElementWithText("h2", msg);
    if (msg.includes("status")) element.classList.add("status-error-msg");
    element.classList.add("error-msg-format");
    return element;
  });
  const articleEl = document.createElement("article");
  articleEl.append(...msg);
  searchResultEl.append(articleEl);
};

// renderiza botão de reset do aside
export const buildResetButtonAside = ({ city, state }) => {
  const resetDivButtonAside = document.querySelector(".reset-city-state");
  resetDivButtonAside.innerHTML = "";
  const resetButtonEl = createResetButton(city, state);
  resetButtonEl.classList.add("reset-button");
  resetDivButtonAside.append(resetButtonEl);
};

// renderiza a listagem de propriedades
export const buildlistProperties = (
  arrformatedObjProperties,
  amountProperties,
  cityAndState
) => {
  const searchResultEl = document.querySelector("#search-result");
  searchResultEl.innerHTML = "";
  const titleListProperties = setTitleListProperties(
    amountProperties,
    cityAndState
  );
  const listProperties = setListProperties(arrformatedObjProperties);

  searchResultEl.append(titleListProperties);
  listProperties.map((propertyElement) => {
    searchResultEl.append(propertyElement);
  });
};
// renderiza o titulo da pesquisa
const setTitleListProperties = (amountProperties, { city, state }) => {
  const articleEl = document.createElement("article");
  const h1El = document.createElement("h1");
  const amountEL = createElementWithText("span", `${amountProperties}`);
  amountEL.classList.add("fw-bold");
  h1El.append(amountEL, ` imóveis à venda em ${city} - ${state}`);
  h1El.classList.add("title-list-properties");

  const resetButton = createResetButton(city, state);
  resetButton.classList.add("reset-button-Title-list", "reset-button");
  articleEl.append(h1El, resetButton);
  articleEl.classList.add("first-article-list");
  return articleEl;
};
// cria botao de reset
const createResetButton = (city, state) => {
  const spanEl = createElementWithText("span", `${city} - ${state}`);
  spanEl.classList.add("span-reset");
  const divEl = document.createElement("div");
  divEl.append(spanEl);
  return divEl;
};
// cria os elementos para listagem das propriedades
const setListProperties = (arrformatedObjProperties) => {
  return arrformatedObjProperties.map((formatedObjProperty) => {
    const aEl = document.createElement("a");
    aEl.setAttribute("href", "#");
    const articleEl = document.createElement("article");
    articleEl.classList.add("property-box");
    const imgEl = createImgBox(formatedObjProperty.imgUrl);
    const infoEl = setInfoProperty(formatedObjProperty);
    aEl.append(imgEl, infoEl);
    articleEl.append(aEl);
    return articleEl;
  });
};
// cria a div para armazenar a imagem
const createImgBox = (imgUrl) => {
  const divEl = document.createElement("div");
  const imgEl = document.createElement("img");
  imgEl.src = imgUrl;
  imgEl.alt = "Imagem da propriedade";
  divEl.append(imgEl);
  divEl.classList.add("img-box");
  return divEl;
};
// cria a div para renderizar as informaçoes das propriedades
const setInfoProperty = ({ address, name, area, amenities, pricingInfos }) => {
  const divEl = document.createElement("div");
  const addressEl = createElementWithText("p", address);
  const nameEl = createElementWithText("p", name);
  const areaEl = setArea(area);
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
// cria os elementos que compoe as informaçoes sobre a area/quartos/banheiros/vagas
const setArea = (area) => {
  const ulEl = document.createElement("ul");
  area.forEach((item) => {
    const liEl = document.createElement("li");
    const qtdEl = createElementWithText("span", item.value);
    qtdEl.classList.add("fw-bold");
    const titleEl = createElementWithText("span", item.title);
    liEl.append(qtdEl, titleEl);
    ulEl.append(liEl);
  });
  return ulEl;
};

// cria os elementos para armazenar as informações dos amenities
const setAmenities = (amenities) => {
  const divEl = document.createElement("div");
  amenities.forEach((amenity) => {
    const translatedAmenity = translateAmenities(amenity, dicionaryAmenities);
    const divAmenityEl = createElementWithText("div", translatedAmenity);
    divAmenityEl.classList.add("amenities");
    divEl.append(divAmenityEl);
  });
  divEl.classList.add("amenities-box");
  return divEl;
};
// cria os elementos para armazenar as informações monetárias da propriedade
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

// cria os botões de contato do hover das parte de informações
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
// cria o link superior com o caminho percorrido.
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
// cria o li com a ancora
const liElements = (text) => {
  const aEl = document.createElement("a");
  aEl.setAttribute("href", "#");
  aEl.append(text);
  const liEl = document.createElement("li");
  liEl.append(aEl);
  return liEl;
};
