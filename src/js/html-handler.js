const doResultReset = (element) => {
  element.innerHTML = "";
}
;
const createElementWithText = (element, text) => {
  // console.log(element, text)
  const elementEl = document.createElement(element);
  // console.log(elementEl)
  elementEl.innerText = text;
  return elementEl;
};

export const setError = () => {
  const searchResultEl = document.querySelector("#search-result");
  doResultReset(searchResultEl);
  const arrWithErrorMsg = [
    "OOOOPS!",
    "ALGO DEU ERRADO NA SUA BUSCA.",
    "status 500",
    "POR FAVOR, TENTE NOVAMENTE.",
  ];
  const msg = arrWithErrorMsg.map((msg) => {
    const element = createElementWithText('h2', msg )   
    if(msg.includes('status')) element.classList.add('statusErrorMsg')
    element.classList.add('errorMsgFormat')
    return element
});
  const articleEl = document.createElement("article");
  articleEl.append(...msg);
  searchResultEl.append(articleEl);
};


export const buildlistProperties = (arrformatedObjProperties, amountProperties, cityAndState) =>{
    const searchResultEl = document.querySelector("#search-result"); 
    doResultReset(searchResultEl);
    const titleListProperties = setTitleListProperties(amountProperties, cityAndState)
    const listProperties = setListProperties(arrformatedObjProperties)
    console.log(listProperties)
    searchResultEl.append(titleListProperties)
    listProperties.map(propertyElement => {
      searchResultEl.append(propertyElement)
    })
    console.log(arrformatedObjProperties, amountProperties)

}
const setTitleListProperties = (amountProperties, cityAndState) => {
    const articleEl = document.createElement('article')
    const h1El = document.createElement('h1')
    const amountEL = createElementWithText('span', `${amountProperties}`)
    amountEL.classList.add('fw-bold')
    h1El.append(amountEL,` imóveis à venda em ${cityAndState}`)
    h1El.classList.add('title-list-properties')
    // console.log(h1El)
    const resetButton = createResetButton(cityAndState)
    resetButton.classList.add('resetButtonTitlelist')
    articleEl.append(h1El, resetButton)
    articleEl.classList.add('first-article-list')
    return articleEl
}
const createResetButton = (cityAndState) => {
    const spanEl = createElementWithText('span',cityAndState )
    const divEl = document.createElement('div')
    divEl.append(spanEl)
    return divEl
}

const setListProperties = (arrformatedObjProperties) => {
  return arrformatedObjProperties.map(formatedObjProperty => {
    // ancora para cada elemento
    const aEl = document.createElement('a')
    aEl.setAttribute('href', '#')
    //  article para acoplar cada box de cada propriedade
    const articleEl = document.createElement('article')
    articleEl.classList.add('property-box')
    // div que recebe a imagem da propriedade
    const imgEl = createImgBox(formatedObjProperty.imgUrl)
    // div que recebe as parte de informações da propriedade
    const infoEl = setInfoProperty(formatedObjProperty)
    articleEl.append(imgEl, infoEl)
    aEl.append(articleEl)
    return aEl
  })
  
  
}
const createImgBox = (imgUrl) => {
  const divEl = document.createElement('div')
  const imgEl = document.createElement('img')
  imgEl.src = imgUrl
  divEl.append(imgEl)
  divEl.classList.add('img-box')
  return divEl
}

const setInfoProperty= ({address, name, area, amenities, pricingInfos}) => {
  const divEl = document.createElement('div')
  const addressEl = createElementWithText('p', address)
  const nameEl = createElementWithText('p', name)
  const areaEl = createElementWithText('p', area)
  const amenitiesEl = setAmenities(amenities)
  const pricingInfosEl = setPriceInfosEl(pricingInfos)
  divEl.classList.add('property-info')
  divEl.append(addressEl, nameEl, areaEl, amenitiesEl, pricingInfosEl)
  return divEl
}

const setAmenities = (amenities) => {
  const divEl = document.createElement('div')
  amenities.forEach(amenity => {
    const divAmenityEl = document.createElement('div')
    divAmenityEl.classList.add('amenities')
    divAmenityEl.innerText = amenity
    divEl.append(divAmenityEl)
  })
  divEl.classList.add('amenities-box')
  return divEl
}

const setPriceInfosEl = ({price, monthlyCondoFee}) => {
  const divEl = document.createElement('div')
  divEl.classList.add('price-infos')
    const priceFormated = new Intl.NumberFormat('pt-BR').format(price)
    const priceEl = createElementWithText('p', `R$ ${priceFormated}`)
    // priceEl.classList.add('price')
    // console.log(priceEl)
  if(monthlyCondoFee){
    // caso exista condominio formata o mesmo e cria o span com o valor que
    // separado para aplicar o estilo 
    const monthlyCondoFeeFormated = new Intl.NumberFormat('pt-BR').format(monthlyCondoFee)
    const spanEl = createElementWithText('span', `R$ ${monthlyCondoFeeFormated}`)
    const monthlyCondoFeeEl = document.createElement('p')
    monthlyCondoFeeEl.append('Condomínio: ', spanEl) 
    // monthlyCondoFeeEl.classList.add('monthlyCondoFee')
    divEl.append(priceEl, monthlyCondoFeeEl)
    return divEl
  }
  divEl.append(priceEl)
  return divEl
}